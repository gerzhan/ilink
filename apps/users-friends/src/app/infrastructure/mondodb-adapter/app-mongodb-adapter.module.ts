import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import {
  DB_COLLECTION_NAME,
  TOKEN_MONGODB_DATABASE_CONNECTION,
} from './constants';

@Global()
@Module({})
export class AppMongodbAdapterModule {
  static forRoot(env: {
    MONGODB_URI?: string;
    DB_NAME?: string;
  }): DynamicModule {
    const { MONGODB_URI = 'mongodb://127.0.0.1', DB_NAME = 'ilink' } = env;
    return {
      module: AppMongodbAdapterModule,
      providers: [
        {
          provide: TOKEN_MONGODB_DATABASE_CONNECTION,
          useFactory: async (): Promise<Db> => {
            try {
              const client = await MongoClient.connect(MONGODB_URI);

              const db = client.db(DB_NAME);
              // NOTE: настройка в БД индексации для поля хранения идентификатора сущности
              await db
                .collection(DB_COLLECTION_NAME.USERS)
                .createIndex({ id: 1 }, { unique: true, sparse: true });

              return db;
            } catch (e) {
              console.log(AppMongodbAdapterModule.name, e);
              throw e;
            }
          },
        },
      ],
      exports: [TOKEN_MONGODB_DATABASE_CONNECTION],
    };
  }
}
