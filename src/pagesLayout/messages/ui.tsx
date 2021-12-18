import { NextPage } from "next";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

export const MessagesPage: NextPage = () => {
  const { t } = useTranslation("messages");

  return (
    <Container>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
    </Container>
  );
};

const Container = styled.div``;
