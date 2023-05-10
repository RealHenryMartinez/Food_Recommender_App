import React from "react";
import styled, { keyframes } from "styled-components/native";

interface Props {
  size?: "small" | "large";
  color?: string;
}

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ActivityIndicatorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.View<Props>`
  border: 8px solid ${(props) => props.color || "#ffffff"};
  border-top-color: transparent;
  border-radius: 50%;
  width: ${(props) => (props.size === "small" ? 20 : 40)}px;
  height: ${(props) => (props.size === "small" ? 20 : 40)}px;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

const CustomActivityIndicator = ({ size = "large", color }: Props) => {
  return (
    <ActivityIndicatorWrapper>
      <Spinner size={size} color={color} />
    </ActivityIndicatorWrapper>
  );
};

export default CustomActivityIndicator;
