import { FC } from "react";

import { NewsCard } from "@/entities/news";
import { store } from "@/features/news/model";

export const NewsList: FC = () => {
  const { useNewsStore } = store;
  const news = useNewsStore();

  return (
    <div>
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
};
