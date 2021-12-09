import { FC, useEffect } from "react";
import styled from "styled-components";

import { useInView } from "react-intersection-observer";
import { actions, store } from "../model";
import { PostCard } from "@/entities/post";
import { Container } from "@/shared/ui/atoms";

export const NewsList: FC = () => {
  const { useNewsStore } = store;
  const { handleLikePost, handleGetNews, handleChangePage, handleReset } =
    actions;
  const { news, isLoading, pages, page } = useNewsStore();
  const [ref, inView] = useInView();

  const handleLike = (postId: string): void => {
    handleLikePost(postId);
  };

  useEffect(() => {
    handleGetNews();

    return () => {
      handleReset();
    };
  }, []);

  useEffect(() => {
    if (inView && !isLoading && page < pages) {
      handleChangePage("increment");
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
            <PostCard key={item.id} post={item} handleLike={handleLike} />
          </PostCardWrapper>
        ))}
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
