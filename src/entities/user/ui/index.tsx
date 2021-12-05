import { FC, ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";

type UserCardProps = {
  name: string;
  username: string;
  link: string;
  actionButton: ReactNode;
};

export const UserCard: FC<UserCardProps> = ({
  name,
  username,
  link,
  actionButton,
}) => (
  <Container>
    <Wrapper>
      <Link href={`/users/${link}`} passHref>
        <Name>{name}</Name>
      </Link>
      <Username>@{username}</Username>
    </Wrapper>
    <Wrapper>{actionButton}</Wrapper>
  </Container>
);

const Container = styled.li`
  display: flex;
  justify-content: space-between;

  position: relative;

  padding: 10px;

  &:not(:last-child) {
    margin-bottom: 16px;

    &::after {
      content: "";

      position: absolute;
      right: 0;
      bottom: -8px;
      left: 0;

      height: 1px;

      background-color: ${({ theme }) => theme.colors.border};
    }
  }
`;

const Wrapper = styled.div``;

const Name = styled.a`
  display: block;

  margin-bottom: 4px;

  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Username = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
`;
