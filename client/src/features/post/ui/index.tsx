import { FC } from "react";

import { actions, store } from "../model";
import { PostCard } from "@/entities/post";
import { Container } from "@/shared/ui/atoms";

export const PostsList: FC = () => {
  const { useNewsStore } = store;
  const { handleLikeNews } = actions;
  const news = useNewsStore();

  const handleLike = (postId: string, isLiked: boolean) => {
    handleLikeNews({ postId, isLiked });
  };

  return (
    <Container>
      {news.map((item) => (
        <PostCard key={item.id} post={item} handleLike={handleLike} />
      ))}
    </Container>
  );
};
