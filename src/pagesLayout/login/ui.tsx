import { NextPage } from "next";
import styled from "styled-components";

import { LoginForm } from "@/entities/auth/login";

export const LoginPage: NextPage = () => (
  <Container>
    <LoginForm />
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
`;
