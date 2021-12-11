import { FC, useEffect } from "react";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import { actions, HandleGetPostsResponse, store } from "../model";
import { PostCard } from "@/entities/post";
import { Container, Loader } from "@/shared/ui/atoms";
import { store as profileStore } from "@/entities/profile";

type NewsListProps = {
  handleGetNews?: (page: number, limit: number) => HandleGetPostsResponse;
};

export const NewsList: FC<NewsListProps> = ({
  handleGetNews: handleGetExternalNews,
}) => {
  const { useNewsStore } = store;
  const { useProfileStore } = profileStore;
  const { handleLikePost, handleGetNews, handleChangePage, handleReset } =
    actions;

  const { news, isLoading, pages, page } = useNewsStore();
  const { id } = useProfileStore();
  const [ref, inView] = useInView();

  const handleLike = (postId: string): void => {
    handleLikePost({ postId, userId: id });
  };

  useEffect(() => {
    handleGetNews(handleGetExternalNews);

    return () => {
      handleReset();
    };
  }, []);

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
        {news.map((item, index) => (
          <PostCardWrapper
            ref={index + 1 === news.length ? ref : null}
            key={item.id}
          >
            <PostCard post={item} handleLike={handleLike} />
          </PostCardWrapper>
        ))}
        {isLoading && (
          <LoaderWrapper>
            {" "}
            <Loader />
          </LoaderWrapper>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    & > ${Container} {
      width: 100%;
    }
  }
`;

const PostCardWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 20px 0;
`;
