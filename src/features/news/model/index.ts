import { createEvent, createStore, forward, sample } from "effector";
import { useStore } from "effector-react";

import { createEffect } from "effector/effector.umd";
import { getPosts, Post } from "@/shared/api/posts";
import { NewsStore } from "@/features/news/model/model.types";

const POSTS_BY_PAGE = 10;

const handleGetNews = createEvent<void>();
const handleLikeNews = createEvent<{ postId: string; isLiked: boolean }>();
const handleChangePage = createEvent<"increment" | "decrement">();
const changePage = createEvent<number>();
const handleChangeIsLoading = createEvent<boolean>();

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

const $news = createStore<NewsStore>({
  page: 1,
  isLoading: false,
  pages: -1,
  news: [],
})
  .on(handleLikeNews, (store, { postId, isLiked }) => {
    const postIndex: number = store.news.findIndex(
      (item) => item.id === postId,
    );
    const newPost: Post = {
      ...store.news[postIndex],
      // isLiked,
      // likesCount: isLiked
      //   ? state[postIndex].likesCount + 1
      //   : state[postIndex].likesCount - 1,
    };

    return {
      ...store,
      news: [
        ...store.news.slice(0, postIndex),
        newPost,
        ...store.news.slice(postIndex + 1),
      ],
    };
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
  .on(changePage, (store, page) => ({ ...store, page }))
  .on(handleChangeIsLoading, (store, isLoading) => ({ ...store, isLoading }));

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

const useNewsStore = () => useStore($news);

const store = {
  useNewsStore,
};
const actions = {
  handleLikeNews,
  handleGetNews,
  handleChangePage,
};

export { store, actions };
