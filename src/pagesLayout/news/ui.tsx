import type { NextPage } from "next";

import { Container } from "@/shared/ui/atoms";
import { NewsList } from "@/features/news";

export const NewsPage: NextPage = () => (
  <Container stretchDesktop>
    <NewsList />
  </Container>
);
