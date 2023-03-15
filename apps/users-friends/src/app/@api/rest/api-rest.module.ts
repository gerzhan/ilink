import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    // TODO: feat
    //  GroupsModule
  ],
})
export class ApiRestModule {}
