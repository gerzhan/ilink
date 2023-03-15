export type User = {
  id: string;
  name: string;
};

export type UserInfo = User & {
  friends: User[];
};
