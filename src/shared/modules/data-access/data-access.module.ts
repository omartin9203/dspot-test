import { Module, Global } from '@nestjs/common';
import {DataAccessProviders} from "./data-access.providers";

@Global()
@Module({
  imports: [
    ...DataAccessProviders
  ],
  providers: [
  ],
  exports: [
    ...DataAccessProviders,
  ],
})
export class DataAccessModule {}
