import { FC, useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import { actions, HandleGetPostsResponse, store } from "../model";
import { PostCard } from "@/entities/post";
import { ListEmptyText, Loader, Title } from "@/shared/ui/atoms";
import { store as profileStore } from "@/entities/profile";

type NewsListProps = {
  handleGetNews?: (page: number, limit: number) => HandleGetPostsResponse;
  postsTitle?: string;
};

export const NewsList: FC<NewsListProps> = ({
  handleGetNews: handleGetExternalNews,
  postsTitle,
}) => {
  const { useNewsStore } = store;
  const { useProfileStore } = profileStore;
  const { handleLikePost, handleGetNews, handleChangePage, handleReset } =
    actions;

  const { news, isLoading, pages, page } = useNewsStore();
  const { id } = useProfileStore();
  const [ref, inView] = useInView();
  const router = useRouter();
  const { t } = useTranslation("common");

  const handleLike = (postId: string): void => {
    handleLikePost({ postId, userId: id });
  };

  useEffect(() => {
    handleGetNews(handleGetExternalNews);

    return () => {
      handleReset();
    };
  }, [router.query.username]);

  useEffect(() => {
    if (inView && !isLoading && page < pages) {
      handleChangePage({
        type: "increment",
        getExternalNews: handleGetExternalNews,
      });
    }
  }, [inView]);

  return (
    <Wrapper>
      <Container>
        {postsTitle && <Title>{postsTitle}</Title>}
        {isLoading ? (
          <Loader center />
        ) : (
          <>
            {news.length ? (
              news.map((item, index) => (
                <PostCardWrapper
                  ref={index + 1 === news.length ? ref : null}
                  key={item.id}
                >
                  <PostCard post={item} handleLike={handleLike} />
                </PostCardWrapper>
              ))
            ) : (
              <ListEmptyText>{t("listEmpty")}</ListEmptyText>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  width: 100%;
`;

const PostCardWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
