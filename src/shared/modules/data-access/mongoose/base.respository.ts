import { IRepository } from 'src/shared/core/domain/interfaces/IRepository';
import { Logger } from '@nestjs/common';
import { PersistentEntity } from './base.entity';
import { IEntity } from 'src/shared/core/domain/interfaces/IEntity';
import { PageParams } from '../../../core/application/PaginatorParams';
import { PaginatedFindResult } from '../../../core/application/PaginatedFindResult';
import {UniqueEntityID} from "../../../core/domain/UniqueEntityID";
import Optional from "../../../core/domain/Option";
import {WhereType} from "../../../core/domain/types/base-where.type";
import {OrderByType} from "../../../core/domain/types/base-orderBy.type";
import {buildWhereFromWhereType} from "./where.builder";
import {Result} from "../../../core/domain/Result";
import {AppError} from "../../../core/domain/errors/AppError";
import { FilterQuery, Model, PopulateOptions } from 'mongoose';

export type FilterableFieldsType<T> = {
  [K in keyof T]?: unknown;
};

export class BaseRepository<
  E extends IEntity,
  P extends PersistentEntity,
  FilterableFields extends FilterableFieldsType<P>,
  IncludesType extends string = string
>
  implements IRepository<E, FilterableFields, IncludesType> {

  protected readonly _logger: Logger;

  protected constructor(
    protected readonly _model: Model<P>,
    private readonly _domainToPersistentFunc: (domainEntity: E) => Partial<P>,
    readonly _persistentToDomainFunc: (entity: P) => E,
    context: string,
  ) {
    this._logger = new Logger(context);
  }

  protected transform(x?: any): P | undefined {
    if (!x) {
      return undefined;
    }
    const entity: any = {};
    Object.keys(x)
      .filter(key => key !== '_id')
      .forEach(key => (entity[key] = x[key]));
    entity.id = x._id.toString();
    return entity;
  }

  async save(entity: E): Promise<void> {
    this._logger.debug(`Save entity with id: {${entity._id}}`);
    const persistentEntity = this._domainToPersistentFunc(entity);
    await this._model.findByIdAndUpdate(
      persistentEntity.id,
      {...(persistentEntity as any)},
      {upsert: true}
      );
    // await new this._model(persistentEntity).save();
  }

  async saveMany(entities: E[]): Promise<void> {
    let subArr = new Array<E>();
    while (entities.length > 0) {
      if (entities.length > 500) subArr = entities.splice(0, 500);
      else subArr = entities.splice(0, entities.length);
      await this._model.create(
        subArr.map((entity: E) => {
          this._logger.debug(`Save entity with id: {${entity._id}}`);
          return this._domainToPersistentFunc(entity);
        })
      );
    }
  }

  async drop(entity: E): Promise<void> {
    this._logger.log(`Drop entity with id: {${entity._id}}`);
    await this._model.findByIdAndDelete(entity._id.toString());
  }

  /**
   *
   * @deprecated
   * @protected
   * @param {PageParams} [pageParam]
   * @returns  {SkipAndLimitType}
   * @memberof BaseRepository
   */
  protected extractLimitAndSkip(pageParam?: PageParams): SkipAndLimitType {
    const limit = pageParam?.pageLimit || 10;
    const page = pageParam?.pageNum || 1;
    const skip = limit * (page - 1);
    return { skip, take: limit };
  }

  /**
   *
   *
   * @protected
   * @param {number} [pageLimit=10]
   * @param {number} [pageNumber=1]
   * @returns  {SkipAndLimitType}
   * @memberof BaseRepository
   */
  protected extractLimitAndSkipFromRaw(
    pageLimit = 10,
    pageNumber = 1,
  ): SkipAndLimitType {
    const skip = pageLimit * (pageNumber - 1);
    return { skip, take: pageLimit };
  }

  protected buildPaginated<E>(
    skip: number,
    limit: number,
    count: number,
    items: E[],
  ): PaginatedFindResult<E> {
    const totalPages: number = Math.ceil(count / limit);
    const currentPage: number = Math.min(skip / limit + 1, totalPages);
    return {
      items,
      limit,
      currentPage,
      totalPages,
      totalItems: count,
    };
  }

  async findById(
    id: UniqueEntityID,
    includes: IncludesType[] = [],
  ): Promise<Optional<E>> {
    const entity = await this._model
      .findById(id.toString())
      .populate(includes.map(this.getPopulateOptions))
      .lean({virtuals: true});
    return Optional(entity).map(this.transform).map(this._persistentToDomainFunc);
  }

  async findOne(
    where?: WhereType<FilterableFields>,
    orderBy?: OrderByType<FilterableFields>,
    includes: IncludesType[] = [],
  ): Promise<Optional<E>> {
    const entity = await this._model
      .findOne(this.buildWhere(where))
      .populate(includes.map(this.getPopulateOptions))
      .sort(this.buildSort(orderBy))
      .lean({virtuals: true});
    return Optional(entity).map(this.transform).map(this._persistentToDomainFunc);
  }

  async getAllPaginated(
    pageParams?: PageParams,
    where?: WhereType<FilterableFields>,
    orderBy?: OrderByType<FilterableFields>,
    includes: IncludesType[] = [],
  ): Promise<PaginatedFindResult<E>> {
    const { skip, take } = this.extractLimitAndSkipFromRaw(pageParams?.pageLimit, pageParams?.pageNum);
    const filter = this.buildWhere(where);
    const count = await this._model.countDocuments(filter);
    const items = await this._model
      .find(filter)
      .populate(includes.map(this.getPopulateOptions))
      .sort(this.buildSort(orderBy))
      .skip(skip)
      .limit(take)
      .lean({virtuals: true});
    return this.buildPaginated(
      skip,
      take,
      count,
      items.map(this.transform).map(this._persistentToDomainFunc),
    );
  }

  async exist(where: WhereType<FilterableFields>): Promise<boolean> {
    return await this._model.exists(this.buildWhere(where));
  }

  protected buildWhere(where?: WhereType<FilterableFields>): FilterQuery<P> {
    return buildWhereFromWhereType(where);
  }

  protected buildSort(orderBy?: OrderByType<FilterableFields>): unknown {
    const fixed = {};
    Object.keys(orderBy ?? {}).forEach(key => fixed[key] = orderBy[key].toString().toLowerCase());
    return fixed;
  }

  async *getAllIterable(
    where?: WhereType<FilterableFields>,
    orderBy?: OrderByType<FilterableFields>,
    includes?: IncludesType[],
    bashSize = 10,
  ): AsyncGenerator<Result<E>> {
    let page = 1;
    let hasNext = true;
    do {
      const pageParam = PageParams.create({
        pageNum: page++,
        pageLimit: bashSize,
      });
      if (pageParam.isFailure) {
        hasNext = false;
        yield Result.Fail<E>(pageParam.unwrapError());
      } else {
        try {
          const { items, currentPage, totalPages } = await this.getAllPaginated(
            pageParam.unwrap(),
            where,
            orderBy,
            includes,
          );
          hasNext = currentPage < totalPages;
          for (const item of items) yield Result.Ok<E>(item);
        } catch (error) {
          const respErr = new AppError.UnexpectedError(error);
          this._logger.error(respErr);
          yield Result.Fail<E>(respErr);
        }
      }
    } while (hasNext);
  }

  protected async updateMany(where: WhereType<FilterableFields>, update: Record<string, unknown>): Promise<number> {
    const { nModified } = await this._model
      .updateMany(this.buildWhere(where), update as any)
      .exec();
    return nModified;
  }

  protected getPopulateOptions(path: string): PopulateOptions {
    const index = path.indexOf('(');
    const head = path.slice(0, index >=0 ? index : undefined);
    const tail = index >= 0 ? path.slice(index + 1, -1) : undefined;
    return {
      path: head,
      populate: tail?.split(',').map(x => ({
        path: x,
      })),
    }
  }
}


type SkipAndLimitType = {
  skip: number;
  take: number;
};
