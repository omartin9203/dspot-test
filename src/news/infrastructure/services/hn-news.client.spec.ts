import {IHnNewsClient} from "../../domain/interfeces/IHnNewsClient";
import {HnNewsProps} from "../../domain/value-objects/hn-news.value-object";
import {HttpService} from "@nestjs/common";
import {AppError} from "../../../shared/core/domain/errors/AppError";
import {generateMockTypeFactory, MockType} from "../../../shared/core/mocks/MockType";
import {Test, TestingModule} from "@nestjs/testing";
import {keys} from "ts-transformer-keys";
import {HnNewsClient} from "./hn-news.client";

type DataResponse = {
  hits: Array<HnNewsProps>;
}

describe('Testing HNNewsClient', () => {
  let clientServiceMock: IHnNewsClient;
  let httpServiceMock: MockType<HttpService>;
  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HttpService,
          useFactory: generateMockTypeFactory<HttpService>(
            keys<HttpService>())
        },
        {
          provide: 'IHnNewsClient',
          useClass: HnNewsClient,
        },
      ]
    }).compile();
    clientServiceMock = testModule.get('IHnNewsClient');
    httpServiceMock = testModule.get(HttpService);

  });

  it('Valid Case', async  () => {
    let data = [{ objectID: '123', created_at_i: 123, story_url: ''}];
    httpServiceMock.get.mockImplementation((url: string) => {
      class MyObservable {
        constructor(readonly url: string) {
        }
        async toPromise() {
          return {
            data: {
              hits: this.url.endsWith('page=1')
                ? []
                : [{ objectID: '123', created_at: '123', author: 'pepe'}]
            } as DataResponse
          }
        }
      }
      return new MyObservable(url);
    });
    const iterable = clientServiceMock.newsIterable();
    for await (const itemRes of iterable) {
      expect(itemRes.isSuccess).toBeTruthy();
      expect(!!data.length).toBeTruthy();
      expect(itemRes.unwrap().getNewsProps().externalId == data[0].objectID).toBeTruthy();
      data = data.slice(1);
    }
    expect(!data.length).toBeTruthy();
  });

  it('Error: AppError.UnexpectedError', async  () => {
    httpServiceMock.get.mockImplementation((_: string) => {
      throw Error()
    });
    const iterable = clientServiceMock.newsIterable();
    let count = 0;
    for await (const itemRes of iterable) {
      expect(itemRes.isFailure).toBeTruthy();
      expect(itemRes.unwrapError() instanceof AppError.UnexpectedError).toBeTruthy();
      count++;
    }
    expect(count).toBe(1);
  });
})
