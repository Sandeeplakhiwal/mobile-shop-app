// LoginPage.js
import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";

// Styled Components for the LoginPage
const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
`;

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <LoginContainer>
        <LoginForm />
      </LoginContainer>
    </LoginPageWrapper>
  );
};

export default LoginPage;
