import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { LoginForm } from "@/entities/auth/login";

export const LoginPage: NextPage = () => {
  const { t } = useTranslation("auth");

  return (
    <Container>
      <Head>
        <title>{t("loginPageTitle")}</title>
      </Head>
      <LoginForm />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
