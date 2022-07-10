import {DisableNewsUseCaseDto} from "../../dto/disable-news-use-case.dto";

export class DisableNewsCommand {
  constructor(public request: DisableNewsUseCaseDto) {
  }
}
