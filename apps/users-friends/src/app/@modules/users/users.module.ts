import { Module } from '@nestjs/common';
import { CreatingNewUserUsecase } from './usecase';

@Module({
  providers: [
    {
      provide: CreatingNewUserUsecase,
      useClass: CreatingNewUserUsecase,
    },
  ],
})
export class UsersModule {}
