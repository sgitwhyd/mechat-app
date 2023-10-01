/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "@/store/reducers/AuthReducer";
import { IAuthState, IAuthContext } from "@/types/auth-store";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/auth.service";
import { getCookies, getFromLocalStorage } from "@/utils";
import { authAction } from "@/store/actions/AuthActions";
import Loading from "@/features/loading";

type AuthProviderProps = {
  children: React.ReactNode;
};

const initalState: IAuthState = {
  isAuthenticated: false,
  user: null,
  room: null,
  isLoading: true,
};

export const AuthContext = createContext<IAuthContext>({
  state: {
    isAuthenticated: false,
    user: null,
    room: null,
    isLoading: true,
  },
  dispatch: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initalState);
  const token = !!getCookies("access_token");

  if (token) {
    const { data } = useQuery({
      queryKey: ["get_user_data"],
      queryFn: async () => {
        const response = await getUser();
        return response.data;
      },
      onSuccess({ data: user }) {
        dispatch({
          type: authAction.SET_LOGIN,
          payload: true,
        });

        const isJoinRoom = getFromLocalStorage("room");

        if (isJoinRoom) {
          dispatch({
            type: authAction.JOIN_ROOM,
            payload: JSON.parse(isJoinRoom),
          });
        }
        dispatch({
          type: authAction.SET_USER,
          payload: {
            user: {
              name: user.name,
              user_id: user._id,
            },
          },
        });
      },
    });
  }

  useEffect(() => {
    if (state.user) {
      dispatch({
        type: authAction.SET_LOADING,
        payload: false,
      });
    } else {
      setTimeout(() => {
        dispatch({
          type: authAction.SET_LOADING,
          payload: false,
        });
      }, 1000);
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {state.isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <Loading />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { dispatch, state } = useContext(AuthContext);
  return {
    dispatch,
    state,
  };
};
