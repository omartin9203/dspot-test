import { Controller, Get, Headers, Res } from '@nestjs/common';
import { BaseController } from '../../../shared/core/presentation/BaseController';
import { Response } from 'express';
import { AppConfigService } from '../../../shared/modules/config/service/app-config-service';

@Controller('zapier')
export class ZapierController extends BaseController {
  constructor(readonly config: AppConfigService) {
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
}
