import {IRepositoryFactory} from "../../../shared/core/domain/interfaces/IRepository";
import {INewsRepository, NewsFilterableFields} from "./INewsRepository";
import {News} from "../entities/news.entity";

export type INewsRepositoryFactory = IRepositoryFactory<News, NewsFilterableFields, string, INewsRepository>;
