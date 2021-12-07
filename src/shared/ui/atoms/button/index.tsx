import { FC } from "react";
import styled from "styled-components";

import { Loader } from "@/shared/ui/atoms";

type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  secondary?: boolean;
  center?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

type ContainerProps = {
  secondary?: boolean;
  center?: boolean;
  isLoading?: boolean;
};

export const Button: FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  secondary,
  center,
  disabled,
  loading,
}) => (
  <Container
    type={type}
    onClick={onClick}
    secondary={secondary}
    center={center}
    disabled={disabled || loading}
    isLoading={loading}
  >
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
    {children}
  </Container>
);

const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;

  position: relative;

  padding: 10px 24px;
  ${({ center }) =>
    center &&
    `
    margin-left: auto;
    margin-right: auto;
  `}

  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;

  transition: 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};

    color: ${({ theme }) => theme.colors.common.light};
  }

  ${({ secondary, theme }) =>
    secondary &&
    `
    border-color: transparent;
    
    &:hover {
      background-color: transparent;
      border-color: ${theme.colors.primary};
      
      color: ${theme.colors.text.primary};
    }
  `}

  &:disabled {
    border-color: ${({ theme }) => theme.colors.border};
    opacity: 0.6;
    cursor: default;

    &:hover {
      background-color: transparent;
      border-color: ${({ theme }) => theme.colors.border};

      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

  ${({ isLoading }) =>
    isLoading &&
    `
    padding-left: 60px;
    
    opacity: 1 !important;

    & ${LoaderWrapper} {
      left: 10px;

      opacity: 1;
    }
  `}
`;

const LoaderWrapper = styled.div`
  position: absolute;
  left: -50%;

  opacity: 0;

  transition: 0.2s ease;
`;
