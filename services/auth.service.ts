import { api } from "@/utils/api";

export const getUser = async () => {
  return api.get("/auth/profile");
};

export const signIn = async (values: { email: string; password: string }) => {
  return api.post("/auth/login", {
    email: values.email,
    password: values.password,
  });
};
