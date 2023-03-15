import { User } from '../entities';

export type NewUserParams = Partial<User>;

export type UserList = User[];

export type UsersRepository = {
  save(params: User): Promise<User>;
  getAll(): Promise<UserList>;
  getById(id: string): Promise<User>;
  deleteById(id: string): Promise<string>;
};
