import { DynamicModule, Global, Module } from '@nestjs/common';
import { AppMongodbAdapterModule } from '../infrastructure/mondodb-adapter/app-mongodb-adapter.module';
import { UsersRepositoryAdapterMongoDB } from '../infrastructure/mondodb-adapter/users-repository-adapter-mongodb';
import { TOKEN_USERS_REPOSITORY } from './constants';

@Global()
@Module({})
export class CoreModule {
  static forRoot(env: { BD_TYPE?: string; DB_NAME?: string }): DynamicModule {
    return {
      module: CoreModule,
      imports: [AppMongodbAdapterModule.forRoot({})],
      providers: [
        {
          provide: TOKEN_USERS_REPOSITORY,
          useClass: UsersRepositoryAdapterMongoDB,
        },
      ],
      exports: [TOKEN_USERS_REPOSITORY],
    };
  }
}
