import { FC, ReactElement } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { Input } from "@/shared/ui/atoms";

type ConversationFooterProps = {
  value: string;
  onChange: (value: string) => void;
  sendButton: ReactElement;
};

export const ConversationFooter: FC<ConversationFooterProps> = ({
  value,
  onChange,
  sendButton,
}) => {
  const { t } = useTranslation("messages");

  return (
    <Container>
      <Input label={t("yourMessage")} value={value} onChange={onChange} />
      {sendButton}
    </Container>
  );
};

const Container = styled.div``;
