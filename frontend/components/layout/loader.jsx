import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 45%;
  right: 48%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #673ab7;
  border-radius: 50%;
  border-top: 4px solid transparent;
  animation: ${rotate} 1s linear infinite;
`;

const TransparentBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); /* Semi-transparent white background */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <TransparentBackground>
      <LoaderContainer />
    </TransparentBackground>
  );
};

export default Loader;
