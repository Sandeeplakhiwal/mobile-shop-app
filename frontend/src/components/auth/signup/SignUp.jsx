import React, { useEffect } from "react";
import styled from "styled-components";
import SignUpForm from "./SignUpForm";

// Styled Components for the SignUpPage
const SignUpPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const SignUpContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
`;

const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign-Up";
  });
  return (
    <SignUpPageWrapper>
      <SignUpContainer>
        <SignUpForm />
      </SignUpContainer>
    </SignUpPageWrapper>
  );
};

export default SignUpPage;
