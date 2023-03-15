import * as Domain from './../../../../@domain';
import { User } from './user.model';

export class UserInfo extends User implements Domain.UserInfo {
  friends = [];
  constructor(dto?: any) {
    super(dto);

    if (dto) {
      this.friends = (dto.friends ?? []).map((item) => new User(item));
    }
  }

  override toJSON() {
    return {
      id: this.id,
      name: this.name,
      friends: this.friends.map((model) => model.toJSON()),
    };
  }
}
