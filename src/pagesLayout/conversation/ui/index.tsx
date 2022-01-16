import { FC, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { store, actions } from "../model";
import {
  store as messagesStore,
  actions as messagesActions,
} from "@/pagesLayout/messages";
import { ConversationHeader } from "@/shared/ui/atoms/conversation";

export const ConversationPage: FC = () => {
  const { useConversationStore } = store;
  const { useMessagesStore } = messagesStore;
  const { setConversation } = actions;
  const { handleGetMessagesFx } = messagesActions;

  const conversation = useConversationStore();
  const userConversations = useMessagesStore();
  const {
    query: { username },
  } = useRouter();

  useLayoutEffect(() => {
    if (!userConversations.length) {
      handleGetMessagesFx();
      return;
    }
    if (username) {
      const currentConversation = userConversations.find(
        (message) => message.user.username === username,
      );

      if (currentConversation) {
        setConversation({
          user: currentConversation?.user,
          messages: currentConversation?.messages,
        });
      }
    }
  }, [username, userConversations]);

  return (
    <Container>
      <ConversationHeader user={conversation.user} />
    </Container>
  );
};

const Container = styled.div``;
