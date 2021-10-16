import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

import { Posts } from "@/entities/post";
import { IPost } from "@/entities/post/lib";

const setPosts = createEvent<Posts>();
const handleLikeNews = createEvent<{ postId: string; isLiked: boolean }>();

const $news = createStore<Posts>([
  {
    title: "Example title",
    description: "lorem ipsum dolor sit amet",
    created: new Date(),
    authorName: "Victor Assembler",
    authorPhoto: "https://place-hold.it/50x50",
    likesCount: 50,
    isLiked: false,
    commentsCount: 120,
    id: "example id",
  },
  {
    title: "Example title123",
    description: "lorem ipsum dolor sit amet",
    created: new Date(),
    authorName: "Victor CPlusPlus",
    authorPhoto: "https://place-hold.it/50x50",
    likesCount: 10000,
    isLiked: true,
    commentsCount: 1230000,
    id: "example id123",
  },
]);

$news.on(setPosts, (_, news) => news);
$news.on(handleLikeNews, (state, { postId, isLiked }) => {
  const postIndex: number = state.findIndex((item) => item.id === postId);
  const newPost: IPost = {
    ...state[postIndex],
    isLiked,
    likesCount: isLiked
      ? state[postIndex].likesCount + 1
      : state[postIndex].likesCount - 1,
  };

  return [...state.slice(0, postIndex), newPost, ...state.slice(postIndex + 1)];
});

const useNewsStore = () => useStore($news);

const store = {
  useNewsStore,
};
const actions = {
  handleLikeNews,
};

export { store, actions };
