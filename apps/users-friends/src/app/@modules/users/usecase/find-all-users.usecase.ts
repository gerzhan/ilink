import { User } from '../models';
import { UsersRepository } from '../repositories/users-repository';

export class FindAllUsersUsecase {
  constructor(private userRepository: UsersRepository) {}

  async execute(presenterAction?: (models: User[]) => void) {
    const usersList = await this.userRepository.getAll();
    presenterAction(usersList);
  }
}
