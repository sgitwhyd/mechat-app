/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUser {
  name: string;
  user_id: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  room: IRoom | null;
  isLoading: boolean;
}

export interface IAuthContext {
  state: IAuthState;
  dispatch: React.Dispatch<any>;
}

interface IUserRoom {
  _id: string;
  name: string;
  email: string;
}

export interface IRoom {
  _id: string;
  code: number;
  name: string;
  user_id: IUserRoom;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthSignUpProps = {
  name: string;
  email: string;
  password: string;
};

export type AuthSignInProps = {
  email: string;
  password: string;
};
