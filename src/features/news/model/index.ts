import {
  createEvent,
  createEffect,
  createStore,
  forward,
  sample,
} from "effector";
import { useStore } from "effector-react";
import { AxiosPromise } from "axios";

import { getPosts, GetPostsResponse, likePost, Post } from "@/shared/api/posts";
import { NewsStore } from "@/features/news/model/model.types";
import { Posts } from "@/entities/post";

export type HandleGetPostsResponse = Promise<AxiosPromise<GetPostsResponse>>;
type GetExternalNews =
  | ((page: number, limit: number) => HandleGetPostsResponse)
  | undefined;

const mapLikedPost = (post: Post, userId: string): Post => {
  const newPost = { ...post };

  if (newPost.isLiked) {
    newPost.likes.splice(post.likes.indexOf(userId), 1);
    newPost.isLiked = !post.isLiked;
    newPost.likesCount -= 1;

    return newPost;
  }

  newPost.likes.push(userId);
  newPost.isLiked = !post.isLiked;
  newPost.likesCount += 1;

  return newPost;
};

export const POSTS_BY_PAGE = 10;

const handleGetNews = createEvent<GetExternalNews>();
const handleLikePost = createEvent<{ postId: string; userId: string }>();
const handleChangePage = createEvent<{
  type: "increment" | "decrement";
  getExternalNews: GetExternalNews;
}>();
const changePage = createEvent<{
  page: number;
  getExternalNews: GetExternalNews;
}>();
const handleChangeIsLoading = createEvent<boolean>();
const handleSetPost = createEvent<Post>();
const handleReset = createEvent<void>();

const handleGetNewsFx = createEffect(
  async ({
    page,
    getExternalNews,
  }: {
    page: number;
    getExternalNews: GetExternalNews;
  }) => {
    try {
      handleChangeIsLoading(true);

      const {
        data: {
          message: { posts, pages },
        },
      } = await (getExternalNews || getPosts)(page, POSTS_BY_PAGE);

      return { posts, pages };
    } catch (e) {
      if (e.message === "No profile id provided") {
        return null;
      }

      console.log(e);

      return null;
    } finally {
      handleChangeIsLoading(false);
    }
  },
);

const handleLikePostFx = createEffect(
  async ({
    postId,
    news,
    userId,
  }: {
    postId: string;
    news: Posts;
    userId: string;
  }) => {
    const post = news.find((item) => item.id === postId);

    if (!post) {
      return;
    }

    const newPost = mapLikedPost(post, userId);

    try {
      handleSetPost(newPost);

      await likePost(postId);
    } catch (e) {
      console.log(e);

      handleSetPost(mapLikedPost(newPost, userId));
    }
  },
);

const $news = createStore<NewsStore>({
  page: 1,
  isLoading: false,
  pages: -1,
  news: [],
})
  .on(handleGetNewsFx.doneData, (store, news) => {
    if (news) {
      return {
        ...store,
        news: [...store.news, ...news.posts],
        pages: news.pages,
      };
    }

    return store;
  })
  .on(changePage, (store, { page }) => ({ ...store, page }))
  .on(handleChangeIsLoading, (store, isLoading) => ({ ...store, isLoading }))
  .on(handleSetPost, (store, post) => {
    const newStore = { ...store };
    newStore.news.splice(
      newStore.news.findIndex((item) => item.id === post.id),
      1,
      post,
    );

    return newStore;
  })
  .reset(handleReset);

sample({
  clock: handleGetNews,
  source: $news,
  fn: ({ page }, payload) => ({ page, getExternalNews: payload }),
  target: handleGetNewsFx,
});

sample({
  clock: handleChangePage,
  source: $news,
  fn: (store, { type, getExternalNews }) => {
    if (type === "increment") {
      return { page: store.page + 1, getExternalNews };
    }

    return { page: store.page - 1, getExternalNews };
  },
  target: changePage,
});
forward({
  from: changePage,
  to: handleGetNewsFx,
});
sample({
  clock: handleLikePost,
  source: $news,
  fn: ({ news }, { postId, userId }) => ({ postId, news, userId }),
  target: handleLikePostFx,
});

const useNewsStore = () => useStore($news);

const store = {
  useNewsStore,
};
const actions = {
  handleLikePost,
  handleGetNews,
  handleChangePage,
  handleReset,
};

export { store, actions };
