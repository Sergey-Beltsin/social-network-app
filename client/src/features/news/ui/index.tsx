import { FC } from "react";

import { store } from "@/features/news/model";
import { NewsCard } from "@/entities/news";
import { Container } from "@/shared/ui/atoms";

export const NewsList: FC = () => {
  const { useNewsStore } = store;
  const news = useNewsStore();

  return (
    <Container>
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </Container>
  );
};
