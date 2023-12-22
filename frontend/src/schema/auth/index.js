import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).max(15).required("Please enter your password"),
});

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(30).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().required("Please enter your password"),
});
