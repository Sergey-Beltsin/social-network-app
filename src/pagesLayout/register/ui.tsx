import { NextPage } from "next";

import { RegisterForm } from "@/entities/auth/register";
import { Container } from "@/shared/ui/atoms";

export const RegisterPage: NextPage = () => (
  <Container flexCenter>
    <RegisterForm />
  </Container>
);
