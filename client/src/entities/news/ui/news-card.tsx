import { FC } from "react";
import styled from "styled-components";

import { INews } from "@/entities/news/lib";

type Props = {
  news: INews;
};

export const NewsCard: FC<Props> = ({ news }) => (
  <Card>{news.description}</Card>
);

const Card = styled.div`
  border-radius: 6px;
  padding: 20px;
`;
