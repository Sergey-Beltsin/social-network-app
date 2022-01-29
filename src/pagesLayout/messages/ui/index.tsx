import { NextPage } from "next";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

import { Title } from "@/shared/ui/atoms";
import { LastMessages } from "@/entities/messages";

export const MessagesPage: NextPage = () => {
  const { t } = useTranslation("messages");

  return (
    <Container>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <Title>{t("title")}</Title>
      <LastMessages />
    </Container>
  );
};

const Container = styled.div``;
