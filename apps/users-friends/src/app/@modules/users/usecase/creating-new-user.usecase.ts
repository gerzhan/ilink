import { NewUserParams } from './../../../../@domain';
import { User } from '../models';
import { UsersRepository } from '../repositories/users-repository';

/**
 * @description
 * Создание(регистрация) нового пользователя в системе
 */
export class CreatingNewUserUsecase {
  constructor(private userRepository: UsersRepository) {
    console.log('init', CreatingNewUserUsecase.name);
  }

  async execute(
    userParams: NewUserParams,
    prisenterAction?: (model: User) => void
  ) {
    const newUser = new User(userParams);
    const user: User = await this.userRepository.save(newUser);

    console.log('создание нового пользователя в системе завершено');
    console.log(user);
    prisenterAction(user);
  }
}
