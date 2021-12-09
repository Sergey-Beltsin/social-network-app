import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

import { useRouter } from "next/router";

TimeAgo.addLocale(en);
TimeAgo.addLocale(ru);

type AuthorInfoProps = {
  photo: string;
  name: string;
  username: string;
  created: Date;
};

export const AuthorInfo: FC<AuthorInfoProps> = ({
  photo,
  name,
  username,
  created,
}) => {
  const { locale } = useRouter();
  const timeAgo = new TimeAgo(locale || "");

  const date = new Date(created);

  return (
    <Container>
      {/* <AuthorPhoto src={photo} alt="" /> */}
      <AuthorInfoDescription>
        <Link href={username} passHref>
          <AuthorName>{name}</AuthorName>
        </Link>
        <AuthorCreated>{timeAgo.format(date)}</AuthorCreated>
      </AuthorInfoDescription>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
`;

const AuthorPhoto = styled.img`
  display: block;

  width: 50px;
  height: 50px;
  margin-right: 10px;

  border-radius: 50%;
`;

const AuthorInfoDescription = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const AuthorName = styled.a`
  display: block;

  margin-bottom: 4px;

  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AuthorCreated = styled.span`
  display: block;

  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
