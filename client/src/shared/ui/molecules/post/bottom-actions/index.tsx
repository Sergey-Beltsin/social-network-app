import { FC } from "react";
import styled from "styled-components";

import { LikesCounter, LikesCounterProps } from "@/shared/ui/atoms/post";

type BottomActionsProps = {
  likes: LikesCounterProps;
};

export const BottomActions: FC<BottomActionsProps> = ({ likes }) => (
  <Container>
    <LikesCounter
      count={likes.count}
      isLiked={likes.isLiked}
      handleLike={likes.handleLike}
      postId={likes.postId}
    />
  </Container>
);

const Container = styled.div`
  margin-top: 30px;
  position: relative;

  &::after {
    content: "";

    position: absolute;
    top: -10px;
    left: -20px;
    right: -20px;

    height: 1px;

    background-color: ${({ theme }) => theme.colors.border};
  }
`;
