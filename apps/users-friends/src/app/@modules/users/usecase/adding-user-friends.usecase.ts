import { User, UserInfo } from '../models';
import { UsersRepository } from '../repositories/users-repository';

/**
 * @description
 * Добавление
 */
export class AddingUserFriendUsecase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    user: UserInfo,
    newFriend: User,
    presenterAction: (userInfo: UserInfo) => void
  ): Promise<void> {
    // TODO: add friend to exisit list with checks
    if (user.id !== newFriend.id) user.friends.push(newFriend);
    // TODO: feat - store to repository
    presenterAction(user);
  }

  private checkUsersAsFriends;
}
