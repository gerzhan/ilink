import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { User, UserInfo, UsersRepository } from '../../@modules/users';
import {
  DB_COLLECTION_NAME,
  TOKEN_MONGODB_DATABASE_CONNECTION,
} from './constants';

@Injectable()
/**
 * @description
 * Реализация адаптера для работы с репозиторием с внешним хранилищем данна MongoDB
 * - реализация с использованием "нативных" запросов
 */
export class UsersRepositoryAdapterMongoDB extends UsersRepository {
  private userCollection: Collection;

  constructor(@Inject(TOKEN_MONGODB_DATABASE_CONNECTION) private db: Db) {
    super();
    this.userCollection = this.db.collection(DB_COLLECTION_NAME.USERS);
  }
  /**
   * @description
   * Сохранить в репозитории данные новой сущности пользователя
   *
   * @param params
   * @returns
   */
  async save(params: User): Promise<User> {
    const { insertedId: id } = await this.userCollection.insertOne(params);
    const user = await this.userCollection
      .findOne({ _id: id })
      .then((data) => new User({ ...data }));
    console.log('mongo', params, user);
    return user;
  }

  async getAll(): Promise<User[]> {
    return (await this.userCollection.find().toArray()).map(
      (item) => new User({ ...item })
    );
  }

  async getById(id: string): Promise<User> {
    const user = await this.userCollection.findOne({ id: id });
    return new User(user);
  }

  async getInfoById(id: string): Promise<UserInfo> {
    const user = await this.userCollection.findOne({ id: id });
    return new UserInfo(user);
  }

  async deleteById(id: string): Promise<string> {
    await this.userCollection.deleteOne({ id: id });
    return id;
  }
}
