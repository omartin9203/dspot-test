import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginatedProfilesResponse } from '../responses/paginated-profile.response';
import { PaginatedFindProfileInput } from '../inputs/paginated-find-profile.input';
import { PaginatedFindProfileQuery } from '../../aplication/queries/impl/paginated-find-profile.query';
import { FindOneProfileQuery } from '../../aplication/queries/impl/find-one-profile.query';
import { FindOneProfileInput } from '../inputs/find-one-profile.input';
import { ProfileMapper } from '../../infrastructure/mapper/profile.mapper';
import { FindOneProfileUseCaseResponse } from '../../aplication/use-cases/find-one-profile/find-one-profile.use-case';
import { FindOneByIdProfileQuery } from '../../aplication/queries/impl/find-one-by-id-profile.query';
import { FindOneByIdProfileUseCaseResponse } from '../../aplication/use-cases/find-one-by-id-profile/find-one-by-id-profile.use-case';
import { CreateProfileInput } from '../inputs/create-profile.input';
import { CreateProfileCommand } from '../../aplication/commands/impl/create-profile.command';
import { Result } from '../../../shared/core/domain/Result';
import { DeleteProfileCommand } from '../../aplication/commands/impl/delete-profile.command';
import { UpdateProfileInput } from '../inputs/update-profile.input';
import { UpdateProfileCommand } from '../../aplication/commands/impl/update-profile.command';
import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { BaseController } from '../../../shared/core/presentation/BaseController';
import { Response } from 'express';

@Controller('profiles')
export class ProfileController extends BaseController {
  constructor(readonly _cBus: CommandBus, readonly _qBus: QueryBus) {
    super();
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query() input: Record<string, string>,
    @Headers('current-language') lang?: string
  ): Promise<Response> {
    this._logger.log('findAll...');
    this._logger.debug(input);
    const resp = await this._qBus.execute(
      new PaginatedFindProfileQuery({
        ...this.fixQuery<PaginatedFindProfileInput>(input),
        includes: ['friends'],
      })
    );
    if (resp.isFailure) return this.fail(response, resp.unwrapError(), lang);
    const paginated = resp.unwrap();
    return this.ok(
      response,
      new PaginatedProfilesResponse(
        paginated.items,
        paginated.limit,
        paginated.currentPage,
        paginated.totalPages,
        paginated.totalItems
      )
    );
  }

  @Get('one')
  async findOne(
    @Res() response: Response,
    @Query() input: Record<string, string>,
    @Headers('current-language') lang?: string
  ): Promise<Response> {
    this._logger.log('findOne...');
    const resp: FindOneProfileUseCaseResponse = await this._qBus.execute(
      new FindOneProfileQuery({
        ...this.fixQuery<FindOneProfileInput>(input),
        includes: ['friends'],
      })
    );
    if (resp.isFailure) return this.fail(response, resp.unwrapError(), lang);
    const itemOrNone = resp.unwrap().map(ProfileMapper.DomainToDto);
    if (itemOrNone.isNone()) return this.notFound(response);
    return this.ok(response, itemOrNone.unwrap() as any);
  }

  @Get(':id')
  async findOneById(
    @Res() response: Response,
    @Param('id') id: string,
    @Headers('current-language') lang?: string
  ): Promise<Response> {
    this._logger.log('findOneById...');
    const resp: FindOneByIdProfileUseCaseResponse = await this._qBus.execute(
      new FindOneByIdProfileQuery({
        id,
        includes: ['friends'],
      })
    );
    if (resp.isFailure) return this.fail(response, resp.unwrapError(), lang);
    const itemOrNone = resp.unwrap().map(ProfileMapper.DomainToDto);
    if (itemOrNone.isNone()) return this.notFound(response);
    return this.ok(response, itemOrNone.unwrap() as any);
  }

  @Post()
  async create(
    @Res() response: Response,
    @Body() input: CreateProfileInput,
    @Headers('current-language') lang?: string
  ): Promise<Response> {
    const resp: Result<void> = await this._cBus.execute(new CreateProfileCommand(input));
    if (resp.isFailure) return this.fail(response, resp.unwrapError(), lang);
    return this.created(response);
  }

  @Delete(':id')
  async delete(
    @Res() response: Response,
    @Param('id') id: string,
    @Headers('current-language') lang?: string
  ): Promise<Response> {
    const resp: Result<void> = await this._cBus.execute(new DeleteProfileCommand({ id }));
    if (resp.isFailure) return this.fail(response, resp.unwrapError(), lang);
    return this.created(response);
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() update: UpdateProfileInput,
    @Headers('current-language') lang?: string
  ): Promise<Response> {
    const resp: Result<void> = await this._cBus.execute(
      new UpdateProfileCommand({
        id,
        update,
      })
    );
    if (resp.isFailure) return this.fail(response, resp.unwrapError(), lang);
    return this.created(response);
  }
}
