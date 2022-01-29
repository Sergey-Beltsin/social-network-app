import { FC } from "react";
import styled from "styled-components";

import { Post } from "@/shared/api/posts";
import { AuthorInfo } from "@/shared/ui/atoms/post";
import { BottomActions } from "@/shared/ui/molecules/post";

type Props = {
  post: Post;
  handleLike: (postId: string) => void;
};

export const PostCard: FC<Props> = ({ post, handleLike }) => (
  <Card>
    <AuthorInfo
      photo=""
      name={`${post.profile.name} ${post.profile.surname}`}
      username={post.profile.username}
      created={new (window.Date as any)(post.created)}
    />
    <Content>{post.content}</Content>
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

const Card = styled.article`
  padding: 20px 20px 10px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 6px;
`;

const Content = styled.span`
  font-size: 14px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 16px;
  }
`;
