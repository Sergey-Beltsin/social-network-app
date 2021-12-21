import { FC, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { store, actions, UsersList } from "@/entities/user";
import { store as profileStore } from "@/entities/profile";
import { AddToFriends } from "@/features/add-to-friends";
import { Input, Tab, Title } from "@/shared/ui/atoms";
import { DropdownTabs } from "@/shared/ui/molecules";
import { Profile } from "@/shared/api/profile";

export const FriendsPage: FC = () => {
  const { useUsersStore } = store;
  const { useProfileStore } = profileStore;
  const {
    handleGetFriendsFx,
    handleSetSearch,
    handleSearch,
    handleReset,
    handleGetIncomingRequestsFx,
    handleSetSingleFriend,
    handleSetSingleIncomingRequest,
    handleSetSingleUser,
  } = actions;

  const { friends, users, incoming, search } = useUsersStore();
  const profile = useProfileStore();
  const { t } = useTranslation("friends");

  useEffect(() => {
    if (profile.id) {
      handleGetFriendsFx(profile.id);
    }
  }, [profile.id]);

  useEffect(
    () => () => {
      handleReset();
    },
    [],
  );

  const handleChangeActiveTab = (activeTab: number) => {
    if (activeTab === 0) {
      handleGetFriendsFx(profile.id);
      handleSetSearch("");
      handleSearch();

      return;
    }

    handleGetIncomingRequestsFx();
  };

  const handleAccept = (user: Profile) => {
    if (user.friendRequest?.status !== "accepted") {
      handleSetSingleUser({
        ...user,
        friendRequest: { ...user.friendRequest, isActionSentNow: true },
      });
      handleSetSingleIncomingRequest({
        ...user,
        friendRequest: { ...user.friendRequest, isActionSentNow: true },
      });

      return;
    }

    handleSetSingleFriend({
      ...user,
      friendRequest: { ...user.friendRequest, isActionSentNow: false },
    });
    handleSetSingleIncomingRequest({
      ...user,
      friendRequest: { ...user.friendRequest, isActionSentNow: false },
    });
  };

  const handleReject = (user: Profile) => {
    if (user.friendRequest?.status === "waiting-for-response") {
      handleSetSingleUser({
        ...user,
        friendRequest: { ...user.friendRequest, isActionSentNow: false },
      });
      handleSetSingleIncomingRequest({
        ...user,
        friendRequest: { ...user.friendRequest, isActionSentNow: false },
      });

      return;
    }

    handleSetSingleFriend({
      ...user,
      friendRequest: { ...user.friendRequest, isActionSentNow: true },
    });
  };

  const handleSetDefault = (user: Profile) => {
    handleSetSingleUser(user);
  };

  return (
    <Container>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <DropdownTabs onChange={handleChangeActiveTab}>
        <Tab title={t("yourFriends")}>
          <InputWrapper>
            <Input
              label={t("findUsers")}
              value={search}
              onChange={handleSetSearch}
              onDebounce={handleSearch}
              required
            />
          </InputWrapper>
          <UsersList
            isLoading={friends.isLoading}
            users={friends.list}
            getActionButton={(user) => (
              <AddToFriends
                user={user}
                onAccept={handleAccept}
                onReject={handleReject}
                onSetDefault={handleSetDefault}
              />
            )}
          />
          {search && (
            <>
              <Title>{t("otherUsers")}</Title>
              <UsersList
                isLoading={users.isLoading}
                users={users.list}
                getActionButton={(user) => (
                  <AddToFriends
                    user={user}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onSetDefault={handleSetDefault}
                  />
                )}
              />
            </>
          )}
        </Tab>
        <Tab title={t("friendRequests")}>
          <UsersList
            isLoading={incoming.isLoading}
            users={incoming.list}
            getActionButton={(user) => (
              <AddToFriends
                user={user}
                onAccept={handleAccept}
                onReject={handleReject}
                onSetDefault={handleSetDefault}
              />
            )}
          />
        </Tab>
      </DropdownTabs>
    </Container>
  );
};

const Container = styled.div``;

const InputWrapper = styled.div`
  margin-bottom: 20px;

  & > label {
    max-width: none;
  }
`;
