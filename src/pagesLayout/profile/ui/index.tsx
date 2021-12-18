import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { AxiosPromise } from "axios";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

import { Loader, Title } from "@/shared/ui/atoms";
import { store as profileStore } from "@/entities/profile";
import { actions as newsActions, NewsList } from "@/features/news";
import { actions, store } from "../model";
import { ProfileCard } from "@/shared/ui/molecules";
import { PostNews } from "@/features/post-news";
import { getPostsByUserId } from "@/shared/api/users";
import { GetPostsResponse } from "@/shared/api/posts";

export const ProfilePage: NextPage = () => {
  const { useProfileStore } = profileStore;
  const { useUserPageStore } = store;
  const { handleGetUser, handleSetUser, handleReset } = actions;
  const { handleAddPost } = newsActions;

  const profile = useProfileStore();
  const userPage = useUserPageStore();
  const {
    query: { username },
  } = useRouter();
  const { t } = useTranslation("profile");

  const isOwnerPage = username === profile.username;

  useEffect(() => {
    if (isOwnerPage) {
      handleSetUser({ ...profile });
    } else {
      handleGetUser(
        Array.isArray(username) ? username.join("") : username || "",
      );
    }

    return () => {
      handleReset();
    };
  }, [isOwnerPage]);

  const getPosts = async (
    page: number,
    limit: number,
  ): Promise<AxiosPromise<GetPostsResponse>> => {
    if (isOwnerPage) {
      if (!profile.id) {
        throw new Error("No profile id provided");
      }

      return getPostsByUserId(profile.id, page, limit);
    }

    if (!userPage.profile.id) {
      throw new Error("No profile id provided");
    }

    return getPostsByUserId(userPage.profile.id, page, limit);
  };

  return (
    <Container>
      <Head>
        <title>
          {userPage.profile.name} {userPage.profile.surname}
        </title>
      </Head>
      {userPage.isLoading ? (
        <Loader center />
      ) : (
        <>
          <Title>
            {isOwnerPage
              ? t("yourProfile")
              : t("userProfile", { user: `@${userPage.profile.username}` })}
          </Title>
          <ProfileCard user={isOwnerPage ? profile : userPage.profile} />
          {isOwnerPage && <PostNews handleAddPost={handleAddPost} />}
          <NewsList
            handleGetNews={getPosts}
            postsTitle={
              isOwnerPage
                ? t("yourPosts")
                : t("userPosts", { user: `@${userPage.profile.username}` })
            }
            noPostsTitle={t("noPosts")}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.div``;
