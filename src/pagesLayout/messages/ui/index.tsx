import { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

import { Title } from "@/shared/ui/atoms";
import { LastMessageCard } from "@/shared/ui/atoms/last-message-card";
import { store, actions } from "../model";

export const MessagesPage: NextPage = () => {
  const { useMessagesStore } = store;
  const { handleGetMessagesFx } = actions;

  const { t } = useTranslation("messages");
  const conversations = useMessagesStore();

  useEffect(() => {
    handleGetMessagesFx();
  }, []);

  return (
    <Container>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <Title>{t("title")}</Title>
      <List>
        {conversations.map(({ user, messages }) => {
          const lastMessage = messages[messages.length - 1];

          return (
            <LastMessageCard
              user={user}
              message={lastMessage.message}
              created={lastMessage.created}
              isOwnerMessage={lastMessage.isOwnerMessage}
            />
          );
        })}
      </List>
    </Container>
  );
};

const Container = styled.div``;

const List = styled.ul`
  margin: 0;
  padding: 0;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  list-style: none;
`;
