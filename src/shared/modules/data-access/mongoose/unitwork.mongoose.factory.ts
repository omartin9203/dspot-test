import {
  IUnitOfWorkFactory,
  IUnitOfWork,
} from 'src/shared/core/domain/interfaces/IUnitOfWork';
import { Connection } from "mongoose";
import {InjectConnection} from "@nestjs/mongoose";
import {MongooseUnitOfWork} from "./unitwork.mongoose";

export class MongooseUnitOfWorkFactory implements IUnitOfWorkFactory {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {}
  build(): IUnitOfWork {
    return new MongooseUnitOfWork(this.connection);
  }
}
