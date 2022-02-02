import { FC } from "react";
import styled from "styled-components";

import useTranslation from "next-translate/useTranslation";
import { Message } from "@/shared/lib/types/messages";
import { compareDatesByDay, getFormattedTime } from "@/shared/lib/utils";
import { months } from "@/shared/lib/constants";

type ConversationMessageProps = {
  message: Message;
  newDate: string | null;
};

type ContainerProps = {
  isOwnerMessage: boolean;
};

export const ConversationMessage: FC<ConversationMessageProps> = ({
  message,
  newDate,
}) => {
  const { t } = useTranslation("date");
  const date = new (window.Date as any)(message.created);
  const currentNewDate = newDate && new (window.Date as any)(newDate);

  return (
    <>
      <Container isOwnerMessage={message.isOwnerMessage}>
        <MainWrapper>
          <MessageText>{message.message}</MessageText>
          <Date>
            {getFormattedTime(date.getHours())}:
            {getFormattedTime(date.getMinutes())}
          </Date>
        </MainWrapper>
      </Container>
      {currentNewDate && compareDatesByDay(date, currentNewDate) && (
        <MessagesDate>
          {t(`months.${months[currentNewDate.getMonth()]}`)},{" "}
          {currentNewDate.getDate()}
        </MessagesDate>
      )}
    </>
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
  display: flex;
  align-items: flex-end;

  max-width: 60%;
  padding: 6px;

  background-color: ${({ theme }) => theme.colors.tertiaryLight};
  border-radius: 6px;
`;

const MessageText = styled.span`
  display: block;

  font-size: 12px;
  line-height: 1.2;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;

const Date = styled.span`
  margin-left: 8px;

  font-size: 8px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 10px;
  }
`;

const MessagesDate = styled.span`
  display: block;

  margin: 10px 0;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 600;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;
