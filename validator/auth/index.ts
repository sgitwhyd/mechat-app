import * as Yup from "yup";

export const signInValidationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signUpValidationSchema = Yup.object({
  name: Yup.string().min(3).required("Email is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});
