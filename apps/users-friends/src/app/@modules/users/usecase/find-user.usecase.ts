import { User } from '../models';
import { UsersRepository } from '../repositories/users-repository';

export class FindUserUsecase {
  constructor(private userRepository: UsersRepository) {}

  async execute(
    userId: string,
    presenterAction: (model: User) => void
  ): Promise<void> {
    const userData = await this.userRepository.getById(userId);
    presenterAction(userData);
  }
}
