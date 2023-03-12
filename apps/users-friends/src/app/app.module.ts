import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiGraphqlModule } from './@api/graphql/api-graphql.module';
import { ApiRestModule } from './@api/rest/api-rest.module';

@Module({
  imports: [ApiGraphqlModule, ApiRestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
