// LoginForm.js
import React, { useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginSchema } from "../../../schema/auth";
import { loginApi } from "../../../apis/auth";
import { loadUser } from "../../../redux/slices/userSlice";

// Styled Components for the LoginForm
const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ErrorParagraph = styled.p`
  font-size: 12px;
  padding-left: 10px;
  color: red;
`;

const InputWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2980b9;
  }
`;

const SignUpLink = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #555;
`;

const SignUpText = styled.span`
  color: #3498db;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        submitHandler(values);
        action.resetForm();
      },
    });

  const { data, error, isSuccess, isPending, mutateAsync, isIdle } =
    useMutation({
      mutationFn: loginApi,
    });

  const submitHandler = (values) => {
    mutateAsync(values);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success("Logged in successfully");
      dispatch(loadUser(data.data?.user));
    }
    if (error) {
      if (error.message === "Network Error") {
        toast.error("You are offline");
      } else {
        toast.error(error?.response?.data?.error);
      }
    }
  }, [data, isSuccess, error]);

  return (
    <LoginFormWrapper>
      <h2 style={{ marginBottom: "10px" }}>Welcome Back!</h2>
      <InputWrapper>
        <Input
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Email"
        />
        {errors.email && touched.email ? (
          <ErrorParagraph>{errors.email}</ErrorParagraph>
        ) : null}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Password"
        />
        {errors.password && touched.password ? (
          <ErrorParagraph>{errors.password}</ErrorParagraph>
        ) : null}
      </InputWrapper>
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={isPending ? true : false}
      >
        Login
      </Button>
      <SignUpLink>
        New User?{" "}
        <Link to={"/signup"}>
          <SignUpText>Sign Up here</SignUpText>
        </Link>
      </SignUpLink>
    </LoginFormWrapper>
  );
};

export default LoginForm;
