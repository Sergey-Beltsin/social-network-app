import { FC } from "react";
import styled from "styled-components";

import { LastMessageCard } from "@/shared/ui/atoms/last-message-card";
import { store } from "../model";

export const LastMessages: FC = () => {
  const { useMessagesStore } = store;

  const conversations = useMessagesStore();

  return (
    <Container>
      {conversations.map(({ user, messages, id }) => {
        const lastMessage = messages[messages.length - 1];

        return (
          <LastMessageCard
            key={id}
            user={user}
            message={lastMessage.message}
            created={lastMessage.created}
            isOwnerMessage={lastMessage.isOwnerMessage}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.ul`
  margin: 0;
  padding: 0;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  list-style: none;
`;
