import { DynamicModule, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

// TODO: feat
@Module({})
export class AppTypeormAdapterModule {
  static forRoot(env: {
    POSTGRES_URI?: string;
    DB_NAME?: string;
  }): DynamicModule {
    const { DB_NAME = 'ilink' } = env;
    return {
      module: AppTypeormAdapterModule,
      providers: [
        {
          provide: 'DATA_SOURCE',
          useFactory: async () => {
            const dataSource = new DataSource({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'ilink',
              password: 'qazwsx12345678',
              database: DB_NAME,
              entities: [__dirname + '/../**/*.entity{.ts,.js}'],
              synchronize: true,
            });

            return dataSource.initialize();
          },
        },
      ],
    };
  }
}
