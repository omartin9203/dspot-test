import { Controller, Get, Headers, Query, Res } from '@nestjs/common';
import { BaseController } from '../../../shared/core/presentation/BaseController';
import { Response } from 'express';
import { AppConfigService } from '../../../shared/modules/config/service/app-config-service';
import { PaginatedFindProfileQuery } from '../../aplication/queries/impl/paginated-find-profile.query';
import { QueryBus } from '@nestjs/cqrs';
import { PaginatedFindProfileUseCaseResp } from '../../aplication/use-cases/paginated-find-profile/paginated-find-profile.use-case';
import { ProfileMapper } from '../../infrastructure/mapper/profile.mapper';

type CandidateEventsQuery = {
  api_key?: string;
  candidate_hash?: string;
  job_hash?: string;
  page?: string;
  limit?: string;
};

@Controller('zapier')
export class ZapierController extends BaseController {
  constructor(readonly config: AppConfigService, readonly _qBus: QueryBus) {
    super();
  }
  @Get('me')
  async me(@Res() response: Response, @Headers('X-API-KEY') apiKey?: string): Promise<Response> {
    if (!apiKey || apiKey != this.config.app.jwtSecret) return this.unauthorized(response);
    return this.ok(response, {
      name: 'test',
      email: 'test@test.com',
    });
  }

  @Get('candidate_events')
  async candidateEvents(
    @Res() response: Response,
    @Query() query: CandidateEventsQuery,
    @Headers('X-API-KEY') apiKey?: string
  ): Promise<Response> {
    if (!apiKey || apiKey != this.config.app.jwtSecret) return this.unauthorized(response);
    const resp: PaginatedFindProfileUseCaseResp = await this._qBus.execute(
      new PaginatedFindProfileQuery({
        pageParams: {
          pageNum: !isNaN(Number(query.page)) ? +query.page : 1,
          pageLimit: !isNaN(Number(query.limit)) ? +query.limit : 10,
        },
        includes: ['friends'],
        order: {
          createdAt: 'DESC',
        },
      })
    );
    if (resp.isFailure) return this.fail(response, resp.unwrapError());
    const paginated = resp.unwrap();
    return this.ok(
      response,
      paginated.items.map(ProfileMapper.DomainToDto).map(x => ({
        id: x.id,
        job: 'FullStack Developer',
        prev_stage: 'A',
        current_stage: 'B',
        candidate: x,
      }))
    );
  }
}
