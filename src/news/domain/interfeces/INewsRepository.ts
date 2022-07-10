import {FieldOptions} from "../../../shared/modules/data-access/types/IFieldOptions";
import {IQuantitativeFieldOptions} from "../../../shared/modules/data-access/types/IQuantitativeFieldOptions";
import {QualitativeFieldOptions} from "../../../shared/modules/data-access/types/IQualitativeFieldOptions";
import {WhereType} from "../../../shared/core/domain/types/base-where.type";
import {OrderByType} from "../../../shared/core/domain/types/base-orderBy.type";
import {IRepository} from "../../../shared/core/domain/interfaces/IRepository";
import {News} from "../entities/news.entity";

export type NewsFilterableFields = {
  author: QualitativeFieldOptions;
  title: QualitativeFieldOptions;
  storyTitle: QualitativeFieldOptions;
  storyUrl: QualitativeFieldOptions;
  url: QualitativeFieldOptions;
  createdAt: IQuantitativeFieldOptions<Date>;
  active: FieldOptions<boolean>;
  externalId: QualitativeFieldOptions;
  createdAtTS: IQuantitativeFieldOptions<number>;
};

export type WhereNews = WhereType<NewsFilterableFields>;

export type OrderByNews = OrderByType<NewsFilterableFields>;

export type INewsRepository = IRepository<News, NewsFilterableFields, string>;
