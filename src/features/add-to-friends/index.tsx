import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { Button } from "@/shared/ui/atoms";
import { store, actions } from "./model";
import { actions as userActions } from "@/entities/user";
import { Profile } from "@/shared/api/profile";

type AddToFriendsProps = {
  user: Profile;
};

export const AddToFriends: FC<AddToFriendsProps> = ({ user }) => {
  const { useAddToFriendsStore } = store;
  const {
    handleAddToFriends,
    handleRespondToRequest,
    handleDeleteFriendRequest,
  } = actions;
  const {
    handleDeleteIncomingRequest,
    handleSetSingleUser,
    handleDeleteUser,
    handleAddFriend,
    handleDeleteFriend,
  } = userActions;

  const { loadingId } = useAddToFriendsStore();
  const { t } = useTranslation("friends");

  const addToFriendsSubmit = () => {
    handleAddToFriends(user);
  };

  const handleAcceptRequest = () => {
    const newUser: Profile = {
      ...user,
      friendRequest: user.friendRequest
        ? {
            ...user.friendRequest,
            status: "accepted",
          }
        : undefined,
    };

    handleRespondToRequest({
      user: newUser,
      onSuccess: () => {
        handleDeleteIncomingRequest(user.id);
        handleAddFriend(newUser);
        handleDeleteUser(user.id);
      },
    });
  };

  const handleRejectRequest = () => {
    handleRespondToRequest({
      user: {
        ...user,
        friendRequest: user.friendRequest
          ? { ...user.friendRequest, status: "waiting-for-response" }
          : undefined,
      },
      onSuccess: () => {
        handleDeleteFriend(user.id);
      },
    });
  };

  const handleSetRequestToDefault = () => {
    const newUser: Profile = {
      ...user,
      friendRequest: user.friendRequest
        ? {
            ...user.friendRequest,
            status: "not-sent",
          }
        : undefined,
    };

    handleRespondToRequest({
      user: newUser,
      onSuccess: () => handleSetSingleUser(newUser),
    });
  };

  const getButtonContent = () => {
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
    if (user.friendRequest?.status === "sent" && user.friendRequest.isSentNow) {
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
  }
`;
