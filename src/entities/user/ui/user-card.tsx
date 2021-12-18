import { FC, ReactElement } from "react";
import styled from "styled-components";
import Link from "next/link";

type UserCardProps = {
  name: string;
  username: string;
  link: string;
  actionButton: ReactElement;
};

export const UserCard: FC<UserCardProps> = ({
  name,
  username,
  link,
  actionButton,
}) => (
  <Container>
    <Wrapper>
      <Link href={link} passHref>
        <Name>{name}</Name>
      </Link>
      <Username>@{username}</Username>
    </Wrapper>
    <Wrapper>{actionButton}</Wrapper>
  </Container>
);

const Container = styled.li`
  display: flex;
  flex-direction: column;

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

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`;

const Name = styled.a`
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

const Username = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 10px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 12px;
  }
`;
