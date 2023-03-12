import { Module } from '@nestjs/common';
import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GroupsModule, UsersModule],
})
export class ApiRestModule {}
