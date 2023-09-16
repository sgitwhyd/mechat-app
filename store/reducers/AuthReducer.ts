/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuthState } from "@/types/auth-store";

export const authReducer = (state: IAuthState, action: any) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "JOIN_ROOM":
      return {
        ...state,
        room: action.payload,
      };
    default:
      return state;
  }
};
