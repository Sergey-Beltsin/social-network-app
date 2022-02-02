import { FC } from "react";
import styled from "styled-components";

import { LastMessageCard } from "@/shared/ui/atoms/last-message-card";
import { store } from "../model";
import { store as profileStore } from "@/entities/profile";

export const LastMessages: FC = () => {
  const { useMessagesStore } = store;
  const { useProfileStore } = profileStore;

  const conversations = useMessagesStore();
  const profile = useProfileStore();

  return (
    <Container>
      {conversations.map(({ users, messages, id }) => {
        const lastMessage = messages[messages.length - 1];

        if (!lastMessage) {
          return <></>;
        }

        return (
          <LastMessageCard
            key={id}
            user={users.find((user) => user.id !== profile.id) || users[0]}
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
