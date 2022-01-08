import { FC, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { Button } from "@/shared/ui/atoms";
import { store, actions } from "./model";
import { FriendRequestStatus, Profile } from "@/shared/api/profile";

type AddToFriendsProps = {
  user: Profile;
  hideProfileBtn?: boolean;
};

export const AddToFriends: FC<AddToFriendsProps> = ({
  user,
  hideProfileBtn = false,
}) => {
  const [friendStatus, setFriendStatus] = useState<FriendRequestStatus>(
    user.friendRequest?.status || "not-sent",
  );
  const [isActionSentNow, setIsActionSentNow] = useState<boolean>(false);

  const { useAddToFriendsStore } = store;
  const {
    handleAddToFriends,
    handleRespondToRequest,
    handleDeleteFriendRequest,
  } = actions;

  const { loadingId } = useAddToFriendsStore();
  const { t } = useTranslation("friends");

  const handleChangeStatus = (
    status: FriendRequestStatus,
    isActionSent: boolean,
  ) => {
    setFriendStatus(status);
    setIsActionSentNow(isActionSent);
  };

  const addToFriendsSubmit = () => {
    handleAddToFriends({
      user,
      onSuccess: () => {
        handleChangeStatus("sent", true);
      },
    });
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
      onSuccess: () => {
        handleChangeStatus(friendStatus, friendStatus !== "accepted");
      },
    });
  };

  const handleRejectRequest = () => {
    const newUser: Profile = {
      ...user,
      friendRequest: { ...user.friendRequest, status: "waiting-for-response" },
    };

    handleRespondToRequest({
      user: newUser,
      onSuccess: () => {
        handleChangeStatus(
          friendStatus,
          friendStatus !== "waiting-for-response",
        );
      },
    });
  };

  const handleSetRequestToDefault = () => {
    handleRespondToRequest({
      user: {
        ...user,
        friendRequest: {
          ...user.friendRequest,
          status: "not-sent",
        },
      },
      onSuccess: () => {
        handleChangeStatus("not-sent", false);
      },
    });
  };

  const handleCancelRequest = () => {
    handleDeleteFriendRequest({
      user: {
        ...user,
        friendRequest: {
          ...user.friendRequest,
          status: "not-sent",
        },
      },
      onSuccess: () => {
        handleChangeStatus("not-sent", false);
      },
    });
  };

  const getButtonContent = () => {
    if (friendStatus === "accepted" && isActionSentNow) {
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
    if (friendStatus === "accepted") {
      return (
        <ButtonsWrapper>
          <Button onClick={handleRejectRequest} loading={loadingId === user.id}>
            {t("removeFriend")}
          </Button>
          {!hideProfileBtn && (
            <Link href={user.username} passHref>
              <Href>
                <Button>{t("viewProfile")}</Button>
              </Href>
            </Link>
          )}
        </ButtonsWrapper>
      );
    }
    if (friendStatus === "sent" && isActionSentNow) {
      return (
        <StyledButton as={Text}>
          {t("requestSent")}
          <StyledButton
            onClick={handleCancelRequest}
            disabled={loadingId === user.id}
          >
            {t("common:cancel")}
          </StyledButton>
        </StyledButton>
      );
    }
    if (friendStatus === "sent") {
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
    if (friendStatus === "waiting-for-response" && isActionSentNow) {
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
    if (friendStatus === "waiting-for-response") {
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
  margin-left: auto;

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
