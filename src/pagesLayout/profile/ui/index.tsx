import { useEffect } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AxiosPromise } from "axios";

import { Container, Loader } from "@/shared/ui/atoms";
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
    <Container stretchDesktop>
      {userPage.isLoading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <>
          <ProfileCard user={isOwnerPage ? profile : userPage.profile} />
          {username === profile.username && (
            <PostNews handleAddPost={handleAddPost} />
          )}
          <NewsList handleGetNews={getPosts} />
        </>
      )}
    </Container>
  );
};

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 20px 0;
`;
