import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { useRouter } from "next/router";

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
  const date = new Date(created);

  return (
    <Container>
      {/* <AuthorPhoto src={photo} alt="" /> */}
      <AuthorInfoDescription>
        <Link href={username} passHref>
          <AuthorName>{name}</AuthorName>
        </Link>
        <AuthorCreated>
          <ReactTimeAgo date={date} locale={locale} />
        </AuthorCreated>
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

  font-size: 12px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;

const AuthorCreated = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 10px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 12px;
  }
`;
