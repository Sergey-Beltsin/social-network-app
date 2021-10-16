import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

import { News } from "@/entities/news";

const setNews = createEvent<News>();

const $news = createStore<News>([
  {
    title: "Example title",
    description: "lorem ipsum dolor sit amet",
    created: new Date(),
    authorName: "Victor Assembler",
    authorPhoto: "https://place-hold.it/50x50",
    likesCount: 50,
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
    commentsCount: 1230000,
    id: "example id123",
  },
]).on(setNews, (_, news) => news);

const useNewsStore = () => useStore($news);

const store = {
  useNewsStore,
};
const actions = {
  setNews,
};

export { store, actions };
