import { User, UserInfo } from '../models';
import { UsersRepository as DomainUsersRepository } from './../../../../@domain';

export abstract class UsersRepository implements DomainUsersRepository {
  abstract save(params: User): Promise<User>;
  abstract getAll(): Promise<User[]>;
  abstract getById(id: string): Promise<User>;
  abstract getInfoById(id: string): Promise<UserInfo>;
  abstract deleteById(id: string): Promise<string>;
}
