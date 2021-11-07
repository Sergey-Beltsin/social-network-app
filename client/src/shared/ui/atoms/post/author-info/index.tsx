import { FC } from "react";
import styled from "styled-components";

import { getFormattedTime } from "@/shared/lib/utils";

type AuthorInfoProps = {
  photo: string;
  name: string;
  created: Date;
};

export const AuthorInfo: FC<AuthorInfoProps> = ({ photo, name, created }) => (
  <Container>
    <AuthorPhoto src={photo} alt={name} />
    <AuthorInfoDescription>
      <AuthorName href="#">{name}</AuthorName>
      <AuthorCreated>
        {`${getFormattedTime(created.getDate())}-${getFormattedTime(
          created.getMonth(),
        )}-${created.getFullYear()}`}{" "}
        {`${getFormattedTime(created.getHours())}:${getFormattedTime(
          created.getMinutes(),
        )}:${getFormattedTime(created.getSeconds())}`}
      </AuthorCreated>
    </AuthorInfoDescription>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 10px;
`;

const AuthorPhoto = styled.img`
  display: block;

  width: 50px;
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
