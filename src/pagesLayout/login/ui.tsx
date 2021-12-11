import { NextPage } from "next";

import { LoginForm } from "@/entities/auth/login";
import { Container } from "@/shared/ui/atoms";

export const LoginPage: NextPage = () => (
  <Container flexCenter>
    <LoginForm />
  </Container>
);
