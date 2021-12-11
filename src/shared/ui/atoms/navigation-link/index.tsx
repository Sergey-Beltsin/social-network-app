import { FC, ReactElement } from "react";
import Link from "next/link";
import styled from "styled-components";

type Props = {
  href: string;
  title: string;
  icon: ReactElement;
  isActive: boolean;
};

type LinksProps = {
  isActive: boolean;
};

export const NavigationLink: FC<Props> = ({ href, icon, title, isActive }) => (
  <Item>
    <Link href={href} passHref>
      <LinkItem isActive={isActive}>
        {icon}
        <Title>{title}</Title>
      </LinkItem>
    </Link>
  </Item>
);

const Item = styled.li`
  display: flex;
  flex-grow: 1;

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
`;

const LinkItem = styled.a<LinksProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  padding: 6px 14px;

  border-radius: 4px;

  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.text.primary};
  text-decoration: none;

  transition: 0.2s ease;

  & > svg {
    width: 20px;
    height: 20px;
  }

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    justify-content: flex-start;

    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.tertiaryLight : "transparent"};

    &:hover,
    &:focus {
      ${({ theme, isActive }) =>
        isActive ? "" : `background-color: ${theme.colors.secondary}`}
    }
  }
`;

const Title = styled.span`
  display: none;

  margin-left: 10px;

  font-size: 13px;
  white-space: nowrap;

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    display: block;
  }
`;
