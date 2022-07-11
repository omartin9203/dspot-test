import { BaseIdentifier } from './Identifier';
import {ObjectId} from "mongodb";

export class UniqueEntityID extends BaseIdentifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : new ObjectId().toHexString());
  }
}
