import { FC } from "react";
import styled from "styled-components";
import { LikeIcon } from "@/shared/lib/icons/post";

export type LikesCounterProps = {
  count: number;
  isLiked: boolean;
  handleLike: (postId: string) => void;
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
  <Container type="button" onClick={() => handleLike(postId)} isLiked={isLiked}>
    <LikeIcon />
    <Text>{count}</Text>
  </Container>
);

const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;

  padding: 4px 10px;

  background-color: ${({ theme }) => theme.colors.components.likesCounterBg};
  border: none;
  border-radius: 100px;
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.6;
  }

  & > svg {
    width: 16px;

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
  
  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    padding: 6px 14px;

    & > svg {
      width: 20px;
    }
  }
}
`;

const Text = styled.span`
  display: block;

  margin-left: 6px;

  font-size: 12px;

  transition: 0.2s ease;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;
