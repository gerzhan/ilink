import { UsersRepository } from '../repositories/users-repository';

export class DeletingUser {
  constructor(private userRepository: UsersRepository) {}

  /**
   * @description
   * Выполнить удаление пользователя
   * @param userId
   * @param presenterAction
   */
  async execute(
    userId: string,
    presenterAction: (id: string) => void
  ): Promise<void> {
    const deletedId = await this.userRepository.deleteById(userId);
    presenterAction(deletedId);
  }
}
