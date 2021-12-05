import { FC } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { Button } from "@/shared/ui/atoms";

type UserCardActionButtonProps = {
  isFriend: boolean;
};

export const UserCardActionButton: FC<UserCardActionButtonProps> = ({
  isFriend,
}) => {
  const { t } = useTranslation("users");

  return (
    <Container>
      {isFriend ? <Button>{t("addToFriends")}</Button> : "already friend"}
    </Container>
  );
};

const Container = styled.div``;
