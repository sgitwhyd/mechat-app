/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAuthState } from "@/types/auth-store";
import { authAction } from "../actions/AuthActions";

export const authReducer = (state: IAuthState, action: any) => {
  switch (action.type) {
    case authAction.SET_LOGIN:
      return {
        ...state,

        isAuthenticated: action.payload,
      };
    case authAction.SET_USER:
      return {
        ...state,

        user: action.payload.user,
      };
    case authAction.JOIN_ROOM:
      return {
        ...state,

        room: action.payload,
      };
    case authAction.LEAVE_ROOM:
      return {
        ...state,
        room: null,
      };
    case authAction.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
