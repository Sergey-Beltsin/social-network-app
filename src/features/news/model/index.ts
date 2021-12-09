import { createEvent, createStore, forward, sample } from "effector";
import { useStore } from "effector-react";

import { createEffect } from "effector/effector.umd";
import { getPosts, likePost } from "@/shared/api/posts";
import { NewsStore } from "@/features/news/model/model.types";
import { Posts } from "@/entities/post";

const POSTS_BY_PAGE = 10;

const handleGetNews = createEvent<void>();
const handleLikePost = createEvent<string>();
const handleChangePage = createEvent<"increment" | "decrement">();
const changePage = createEvent<number>();
const handleChangeIsLoading = createEvent<boolean>();
const handleReset = createEvent<void>();

const handleGetNewsFx = createEffect(async (page: number) => {
  try {
    handleChangeIsLoading(true);

    const {
      data: {
        message: { posts, pages },
      },
    } = await getPosts(page, POSTS_BY_PAGE);

    return { posts, pages };
  } catch (e) {
    console.log(e);

    return null;
  } finally {
    handleChangeIsLoading(false);
  }
});

const handleLikePostFx = createEffect(
  async ({ postId, news }: { postId: string; news: Posts }) => {
    try {
      const {
        data: { message },
      } = await likePost(postId);

      news.splice(
        news.findIndex((item) => item.id === postId),
        1,
        message,
      );

      return news;
    } catch (e) {
      console.log(e);

      return null;
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
  .on(handleLikePostFx.doneData, (store, news) => {
    if (news) {
      return {
        ...store,
        news: [...news],
      };
    }

    return store;
  })
  .on(changePage, (store, page) => ({ ...store, page }))
  .on(handleChangeIsLoading, (store, isLoading) => ({ ...store, isLoading }))
  .reset(handleReset);

sample({
  clock: handleGetNews,
  source: $news,
  fn: ({ page }) => page,
  target: handleGetNewsFx,
});

sample({
  clock: handleChangePage,
  source: $news,
  fn: (store, payload) => {
    if (payload === "increment") {
      return store.page + 1;
    }

    return store.page - 1;
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
  fn: ({ news }, postId) => ({ postId, news }),
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
