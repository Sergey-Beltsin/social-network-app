import { FC, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { store, actions } from "@/entities/messages";
import {
  ConversationHeader,
  ConversationMessage,
} from "@/shared/ui/atoms/conversation";
import { SendMessage } from "@/features/send-message";

export const ConversationPage: FC = () => {
  const { useMessagesStore, useActiveConversationStore } = store;
  const { handleGetMessagesFx, handleSetActiveConversation } = actions;

  const conversations = useMessagesStore();
  const activeConversation = useActiveConversationStore();
  const {
    query: { username },
    push,
  } = useRouter();

  useLayoutEffect(() => {
    if (!conversations.length) {
      handleGetMessagesFx();
      return;
    }
    if (username) {
      const currentConversation = conversations.find(
        (message) => message.user.username === username,
      );

      if (currentConversation) {
        handleSetActiveConversation(currentConversation.id);
      }
    }
  }, [username, conversations]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        push("/messages");
      }
    });
  }, []);

  if (!activeConversation) return <></>;

  return (
    <Container>
      <ConversationHeader user={activeConversation.user} />
      <Messages>
        {activeConversation.messages.map((message, index) => (
          <ConversationMessage
            key={`${message.id}-${index}`}
            message={message}
          />
        ))}
      </Messages>
      <SendMessage conversationId={activeConversation.id} />
    </Container>
  );
};

const Container = styled.div``;

const Messages = styled.div`
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: flex-end;

  height: calc(100vh - 232px);
  padding: 10px 20px;

  background-color: ${({ theme }) => theme.colors.secondary};
  overflow-y: auto;
`;
