import { FC } from "react";
import styled from "styled-components";
import { LikeIcon } from "@/shared/lib/icons/post";

export type LikesCounterProps = {
  count: number;
  isLiked: boolean;
  handleLike: (postId: string, isLiked: boolean) => void;
  postId: string;
};

type ContainerProps = {
  isLiked: boolean;
};

export const LikesCounter: FC<LikesCounterProps> = ({
  count,
  isLiked,
  handleLike,
  postId,
}) => (
  <Container
    type="button"
    onClick={() => handleLike(postId, !isLiked)}
    isLiked={isLiked}
  >
    <LikeIcon />
    <Text>{count}</Text>
  </Container>
);

const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;

  padding: 6px 14px;

  background-color: ${({ theme }) => theme.colors.components.likesCounterBg};
  border: none;
  border-radius: 100px;
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.6;
  }

  & > svg {
    fill: ${({ theme }) => theme.colors.text.primary};

    transition: 0.2s ease;
  }

  ${({ isLiked, theme }) =>
    isLiked &&
    `
    background-color: ${theme.colors.lightRed};

    & > svg {
      fill: ${theme.colors.red};
    }
    
    & > ${Text} {
      color: ${theme.colors.red};
    }
  `}
`;

const Text = styled.span`
  display: block;

  margin-left: 6px;

  transition: 0.2s ease;
`;
