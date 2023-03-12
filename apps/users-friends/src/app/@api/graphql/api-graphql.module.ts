import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [UsersModule, GroupsModule],
      playground: true,
      autoSchemaFile: true,
      // TODO: perf - use config
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    GroupsModule,
  ],
})
export class ApiGraphqlModule {}
