type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type messageProps = {
  _id: string;
  roomId: string;
  text: string;
  user_id: User;
  createdAt: string;
  updatedAt: string;
};

export interface IRoom {
  _id: string;
  name: string;
  code: string;
  user_id: User;
  createdAt: string;
  updatedAt: string;
}
