// SignUpForm.js
import { useFormik } from "formik";
import React, { useEffect } from "react";
import styled from "styled-components";
import { signUpSchema } from "../../../schema/auth";
import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../../../apis/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loadUser } from "../../../redux/slices/userSlice";
import { Link } from "react-router-dom";

// Styled Components for the SignUpForm
const SignUpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #45a049;
  }
`;

const SignInLink = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: #555;
`;

const SignInText = styled.span`
  color: #3498db;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUpForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();

  const { values, errors, handleSubmit, handleBlur, handleChange, touched } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        submitHandler(values);
        action.resetForm();
      },
    });

  const { data, error, isSuccess, isPending, mutateAsync, isIdle } =
    useMutation({
      mutationFn: signUpApi,
    });

  const submitHandler = (values) => {
    mutateAsync(values);
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success("Registerd successfully");
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
    <SignUpFormWrapper>
      <h2 style={{ marginBottom: "10px" }}>Create an Account</h2>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Username"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name ? (
          <ErrorParagraph>{errors.name}</ErrorParagraph>
        ) : null}
      </InputWrapper>
      <InputWrapper>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email ? (
          <ErrorParagraph>{errors.email}</ErrorParagraph>
        ) : null}
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password ? (
          <ErrorParagraph>{errors.password}</ErrorParagraph>
        ) : null}
      </InputWrapper>
      <Button type="submit" onClick={handleSubmit}>
        Sign Up
      </Button>
      <SignInLink>
        Already have an account?{" "}
        <Link to={"/login"}>
          <SignInText>Sign In here</SignInText>
        </Link>
      </SignInLink>
    </SignUpFormWrapper>
  );
};

export default SignUpForm;
