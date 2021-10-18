import { FC } from "react";
import styled from "styled-components";
import { LoginForm } from "@/entities/auth/login";

export const Login: FC = () => (
  <Wrapper>
    <LoginForm />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-top: -20px;
`;
