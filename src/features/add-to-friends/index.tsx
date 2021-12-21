import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { Button } from "@/shared/ui/atoms";
import { store, actions } from "./model";
import { Profile } from "@/shared/api/profile";

type AddToFriendsProps = {
  user: Profile;
  onAccept: (user: Profile) => void;
  onReject: (user: Profile) => void;
  onSetDefault: (user: Profile) => void;
};

export const AddToFriends: FC<AddToFriendsProps> = ({
  user,
  onAccept,
  onReject,
  onSetDefault,
}) => {
  const { useAddToFriendsStore } = store;
  const {
    handleAddToFriends,
    handleRespondToRequest,
    handleDeleteFriendRequest,
  } = actions;

  const { loadingId } = useAddToFriendsStore();
  const { t } = useTranslation("friends");

  const addToFriendsSubmit = () => {
    handleAddToFriends(user);
  };

  const handleAcceptRequest = () => {
    const newUser: Profile = {
      ...user,
      friendRequest: {
        ...user.friendRequest,
        status: "accepted",
      },
    };

    handleRespondToRequest({
      user: newUser,
      onSuccess: () => onAccept(user),
    });
  };

  const handleRejectRequest = () => {
    const newUser: Profile = {
      ...user,
      friendRequest: { ...user.friendRequest, status: "waiting-for-response" },
    };

    handleRespondToRequest({
      user: newUser,
      onSuccess: () => onReject(user),
    });
  };

  const handleSetRequestToDefault = () => {
    const newUser: Profile = {
      ...user,
      friendRequest: {
        ...user.friendRequest,
        status: "not-sent",
      },
    };

    handleRespondToRequest({
      user: newUser,
      onSuccess: () => onSetDefault(newUser),
    });
  };

  const getButtonContent = () => {
    if (
      user.friendRequest?.status === "accepted" &&
      user.friendRequest.isActionSentNow
    ) {
      return (
        <StyledButton as={Text}>
          {t("friendRemoved")}
          <StyledButton
            onClick={handleAcceptRequest}
            disabled={loadingId === user.id}
          >
            {t("common:cancel")}
          </StyledButton>
        </StyledButton>
      );
    }
    if (user.friendRequest?.status === "accepted") {
      return (
        <ButtonsWrapper>
          <Button onClick={handleRejectRequest} loading={loadingId === user.id}>
            {t("removeFriend")}
          </Button>
          <Link href={user.username} passHref>
            <Href>
              <Button>{t("viewProfile")}</Button>
            </Href>
          </Link>
        </ButtonsWrapper>
      );
    }
    if (
      user.friendRequest?.status === "sent" &&
      user.friendRequest.isActionSentNow
    ) {
      return (
        <StyledButton as={Text}>
          {t("requestSent")}
          <StyledButton
            onClick={() =>
              handleDeleteFriendRequest({
                ...user,
                friendRequest: user.friendRequest,
              })
            }
            disabled={loadingId === user.id}
          >
            {t("common:cancel")}
          </StyledButton>
        </StyledButton>
      );
    }
    if (user.friendRequest?.status === "sent") {
      return (
        <Button
          secondary
          onClick={handleSetRequestToDefault}
          loading={loadingId === user.id}
        >
          {t("unsubscribe")}
        </Button>
      );
    }
    if (
      user.friendRequest?.status === "waiting-for-response" &&
      user.friendRequest.isActionSentNow
    ) {
      return (
        <StyledButton as={Text}>
          {t("friendAdded")}
          <StyledButton
            onClick={handleRejectRequest}
            disabled={loadingId === user.id}
          >
            {t("common:cancel")}
          </StyledButton>
        </StyledButton>
      );
    }
    if (user.friendRequest?.status === "waiting-for-response") {
      return (
        <ButtonsWrapper>
          <Button onClick={handleAcceptRequest} loading={loadingId === user.id}>
            {t("common:accept")}
          </Button>
        </ButtonsWrapper>
      );
    }

    return (
      <Button onClick={addToFriendsSubmit} loading={loadingId === user.id}>
        {t("addToFriends")}
      </Button>
    );
  };

  return <Container>{getButtonContent()}</Container>;
};

const Container = styled.div``;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  & > button,
  & > a {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

const Href = styled.a`
  text-decoration: none;
`;

const Text = styled.span`
  margin-top: 0 !important;

  cursor: default !important;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 10px;

  &:hover {
    text-decoration: none !important;
  }

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    font-size: 14px;
  }
`;

const StyledButton = styled.button`
  display: block;

  width: fit-content;
  margin-top: 8px;

  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;

    &:hover {
      text-decoration: none;
    }
  }
`;
