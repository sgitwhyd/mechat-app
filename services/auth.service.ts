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
  } catch (error) {
    return {
      error: true,
      message: "Sign In Failed!",
    };
  }
};
