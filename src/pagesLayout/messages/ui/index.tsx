import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

import { Title } from "@/shared/ui/atoms";
import { actions, LastMessages, store } from "@/entities/messages";

export const MessagesPage: NextPage = () => {
  const { handleGetMessagesFx } = actions;
  const { useMessagesStore } = store;

  const conversations = useMessagesStore();
  const { t } = useTranslation("messages");

  useEffect(() => {
    if (!conversations.length) {
      handleGetMessagesFx();
    }
  }, []);

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
