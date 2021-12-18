import { NextPage } from "next";
import styled from "styled-components";

import { RegisterForm } from "@/entities/auth/register";

export const RegisterPage: NextPage = () => (
  <Container>
    <RegisterForm />
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
`;
