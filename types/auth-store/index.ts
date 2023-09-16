/* eslint-disable @typescript-eslint/no-explicit-any */
interface IUser {
  name: string;
  user_id: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  room: IRoom | null;
}

export interface IAuthContext {
  state: IAuthState;
  dispatch: React.Dispatch<any>;
}

export interface IRoom {
  _id: string;
  code: number;
  name: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}
