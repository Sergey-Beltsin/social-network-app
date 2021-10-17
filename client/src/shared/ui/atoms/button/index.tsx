import { FC } from "react";
import styled from "styled-components";

type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export const Button: FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
}) => (
  <Container type={type} onClick={onClick}>
    {children}
  </Container>
);

const Container = styled.button`
  display: block;

  padding: 10px 24px;

  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  cursor: pointer;

  transition: 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};

    color: ${({ theme }) => theme.colors.textWhite};
  }
`;
