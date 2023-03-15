import { UserInfo } from '../models';
import { UsersRepository } from '../repositories/users-repository';

export class FindUserInfoUsecase {
  constructor(private userRepository: UsersRepository) {}

  async execute(
    userId: string,
    presenterAction: (model: UserInfo) => void
  ): Promise<void> {
    const userInfo = await this.userRepository.getInfoById(userId);
    console.log('userInfo',userInfo)
    presenterAction(userInfo);
  }
}
