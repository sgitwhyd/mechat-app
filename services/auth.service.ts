/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/utils/api";
import { putToCookie } from "@/utils";

export const getUser = async () => {
  return api.get("/auth/profile");
};

export const signIn = async (values: { email: string; password: string }) => {
  try {
    const request = await api.post("/auth/login", {
      email: values.email,
      password: values.password,
    });
    const response = await request.data;
    const token = response.token;
    putToCookie("access_token", token);

    return {
      error: false,
      message: "Login Successfully",
    };
  } catch (error: any) {
    const { data } = error.response;
    return {
      error: true,
      message: data.message,
    };
  }
};

export const signUp = async (values: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const request = await api.post("/auth/register", {
      name: values.name,
      email: values.email,
      password: values.password,
    });
    const response = await request.data;

    return {
      error: false,
      message: response.message,
    };
  } catch (error: any) {
    const { data } = error.response;
    return {
      error: true,
      message: data.message,
    };
  }
};
