import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { RegisterForm } from "@/entities/auth/register";

export const RegisterPage: NextPage = () => {
  const { t } = useTranslation("auth");
  return (
    <Container>
      <Head>
        <title>{t("regPageTitle")}</title>
      </Head>
      <RegisterForm />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;
