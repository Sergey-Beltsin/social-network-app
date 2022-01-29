import { FC } from "react";
import styled from "styled-components";

import { Message } from "@/shared/lib/types/messages";
import { getFormattedTime } from "@/shared/lib/utils";

type ConversationMessageProps = {
  message: Message;
};

type ContainerProps = {
  isOwnerMessage: boolean;
};

export const ConversationMessage: FC<ConversationMessageProps> = ({
  message,
}) => {
  const date = new (window.Date as any)(message.created);

  return (
    <Container isOwnerMessage={message.isOwnerMessage}>
      <MainWrapper>
        <MessageText>{message.message}</MessageText>
        <Date>
          {getFormattedTime(date.getHours())}:
          {getFormattedTime(date.getMinutes())}
        </Date>
      </MainWrapper>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${({ isOwnerMessage }) =>
    isOwnerMessage ? "flex-end" : "flex-start"};

  &:not(:last-child) {
    margin-bottom: 6px;
  }

  &:first-child {
    margin-top: auto;
  }

  ${({ theme, isOwnerMessage }) =>
    isOwnerMessage
      ? `
    & ${MainWrapper} {
      background-color: ${theme.colors.primary};
    }
    
    & ${MessageText},
    & ${Date} {
      color: ${theme.colors.text.white};
    }
  `
      : ""}
`;

const MainWrapper = styled.div`
  padding: 6px;

  background-color: ${({ theme }) => theme.colors.tertiaryLight};
  border-radius: 6px;
`;

const MessageText = styled.span`
  font-size: 12px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;

const Date = styled.span`
  margin-left: 10px;

  font-size: 8px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 10px;
  }
`;
