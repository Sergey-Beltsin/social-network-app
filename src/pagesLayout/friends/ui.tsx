import { FC, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { store, actions, UsersList } from "@/entities/user";
import { store as profileStore } from "@/entities/profile";
import { AddToFriends } from "@/features/add-to-friends";
import { Input, Tab, Title } from "@/shared/ui/atoms";
import { DropdownTabs } from "@/shared/ui/molecules";

export const FriendsPage: FC = () => {
  const { useUsersStore } = store;
  const { useProfileStore } = profileStore;
  const {
    handleGetFriendsFx,
    handleSetSearch,
    handleSearch,
    handleReset,
    handleGetIncomingRequestsFx,
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
            getActionButton={(user) => <AddToFriends user={user} />}
          />
          {search && (
            <>
              <Title>{t("otherUsers")}</Title>
              <UsersList
                isLoading={users.isLoading}
                users={users.list}
                getActionButton={(user) => <AddToFriends user={user} />}
              />
            </>
          )}
        </Tab>
        <Tab title={t("friendRequests")}>
          <UsersList
            isLoading={incoming.isLoading}
            users={incoming.list}
            getActionButton={(user) => <AddToFriends user={user} />}
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
