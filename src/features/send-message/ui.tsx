import { FC, FormEvent } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { SendIcon } from "@/shared/lib/icons/common";
import { Input } from "@/shared/ui/atoms";
import { store, actions } from "./model";
import { actions as conversationsActions } from "@/entities/messages";
import { Profile } from "@/shared/api/profile";

type SendMessageProps = {
  conversationId: string | null;
  user: Profile | null;
};

export const SendMessage: FC<SendMessageProps> = ({ conversationId, user }) => {
  const { handleChange, handleReset } = actions;
  const { handleSendMessageFx } = conversationsActions;
  const { useMessageStore } = store;

  const { t } = useTranslation("messages");
  const message = useMessageStore();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    handleSendMessageFx({ conversationId, message, user });
    handleReset();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        placeholder={t("yourMessage")}
        value={message}
        onChange={handleChange}
        required
        stretch
      />
      <Button type="submit">
        <SendIcon />
      </Button>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  align-items: center;

  min-height: 50px;
  padding: 10px 20px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0 0 8px 8px;
`;

const Button = styled.button`
  margin-left: 10px;

  background-color: transparent;
  border: none;
  cursor: pointer;

  & > svg {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
