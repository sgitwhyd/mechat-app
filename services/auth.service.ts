/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/libs/axios";
import { putToCookie, removeCookie } from "@/utils";
import { useMutation } from "@tanstack/react-query";

export const getUser = async () => {
  return axiosInstance.get("/auth/profile");
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      return response.data;
    },
    onSuccess({ token }) {
      putToCookie("access_token", token);
    },
    onError(err: any) {
      throw err.response.data.message;
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      return response.data;
    },
    onError(err: any) {
      throw err.response.data.message;
    },
  });
};

export const signOut = () => {
  removeCookie("access_token");
  window.location.reload();
  return {
    message: "Logout Success",
  };
};
