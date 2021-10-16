import { FC } from "react";

import styled from "styled-components";
import { actions, store } from "../model";
import { PostCard } from "@/entities/post";
import { Container } from "@/shared/ui/atoms";

export const PostsList: FC = () => {
  const { useNewsStore } = store;
  const { handleLikeNews } = actions;
  const news = useNewsStore();

  const handleLike = (postId: string, isLiked: boolean): void => {
    handleLikeNews({ postId, isLiked });
  };

  return (
    <Wrapper>
      <Container>
        {news.map((item) => (
          <PostCard key={item.id} post={item} handleLike={handleLike} />
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    & > ${Container} {
      width: 100%;
    }
  }
`;
