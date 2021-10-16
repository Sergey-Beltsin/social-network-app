import { FC } from "react";
import styled from "styled-components";

import { INews } from "@/entities/news/lib";
import { getFormattedTime } from "@/shared/lib/utils";

type Props = {
  news: INews;
};

export const NewsCard: FC<Props> = ({ news }) => (
  <Card>
    <AuthorInfo>
      <AuthorPhoto src={news.authorPhoto} alt={news.authorName} />
      <AuthorInfoDescription>
        <AuthorName>{news.authorName}</AuthorName>
        <AuthorCreated>
          {`${getFormattedTime(news.created.getDate())}-${getFormattedTime(
            news.created.getMonth(),
          )}-${news.created.getFullYear()}`}{" "}
          {`${getFormattedTime(news.created.getHours())}:${getFormattedTime(
            news.created.getMinutes(),
          )}:${getFormattedTime(news.created.getSeconds())}`}
        </AuthorCreated>
      </AuthorInfoDescription>
    </AuthorInfo>
    {news.description}
  </Card>
);

const Card = styled.div`
  padding: 20px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 6px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorPhoto = styled.img`
  display: block;

  width: 30px;
  margin-right: 10px;

  border-radius: 50%;
`;

const AuthorInfoDescription = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const AuthorName = styled.span`
  display: block;

  margin-bottom: 2px;

  font-size: 10px;
`;

const AuthorCreated = styled.span`
  display: block;

  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
