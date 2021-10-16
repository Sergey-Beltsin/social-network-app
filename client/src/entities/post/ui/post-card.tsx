import { FC } from "react";
import styled from "styled-components";

import { IPost } from "../lib";
import { AuthorInfo } from "@/shared/ui/atoms/post";
import { BottomActions } from "@/shared/ui/molecules/post";

type Props = {
  post: IPost;
  handleLike: (postId: string, isLiked: boolean) => void;
};

export const PostCard: FC<Props> = ({ post, handleLike }) => (
  <Card>
    <AuthorInfo
      photo={post.authorPhoto}
      name={post.authorName}
      created={post.created}
    />
    {post.description}
    <BottomActions
      likes={{
        count: post.likesCount,
        isLiked: post.isLiked,
        handleLike,
        postId: post.id,
      }}
    />
  </Card>
);

const Card = styled.div`
  padding: 20px 20px 10px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 6px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
