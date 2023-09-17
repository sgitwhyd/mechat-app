/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import { IAuthState, IAuthContext } from "@/types/auth-store";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/auth.service";
import { getCookies } from "@/utils";

type AuthProviderProps = {
  children: React.ReactNode;
};

const initalState: IAuthState = {
  isAuthenticated: false,
  user: null,
  room: null,
};

export const AuthContext = createContext<IAuthContext>({
  state: {
    isAuthenticated: false,
    user: null,
    room: null,
  },
  dispatch: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initalState);
  const token = !!getCookies("access_token");

  if (token) {
    const { data } = useQuery(
      ["get-user"],
      async () => {
        return await getUser();
      },
      {
        onSuccess: ({ data: result }) => {
          dispatch({
            type: "SET_USER",
            payload: {
              user: {
                name: result.data.name,
                user_id: result.data._id,
              },
            },
          });
          dispatch({
            type: "SET_LOGIN",
            payload: true,
          });
          dispatch({
            type: "JOIN_ROOM",
            payload: JSON.parse(localStorage.getItem("room") as string),
          });
        },
        onError: (err) => {
          console.log(err);
        },
        refetchOnMount: false,
      }
    );
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
