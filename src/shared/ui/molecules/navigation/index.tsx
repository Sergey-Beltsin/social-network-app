import { ReactElement } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { NavigationLink } from "@/shared/ui/atoms";
import {
  NewsIcon,
  CommunityIcon,
  MessagesIcon,
  SettingsIcon,
  ProfileIcon,
} from "@/shared/lib/icons/navigation";

interface ILink {
  href: string;
  title: string;
  icon: ReactElement;
}

export const Navigation = () => {
  const { t } = useTranslation("navigation");
  const router = useRouter();

  const links: Array<ILink> = [
    {
      href: "/profile",
      title: t("profile"),
      icon: <ProfileIcon />,
    },
    {
      href: "/news",
      title: t("news"),
      icon: <NewsIcon />,
    },
    {
      href: "/messages",
      title: t("messages"),
      icon: <MessagesIcon />,
    },
    {
      href: "/groups",
      title: t("groups"),
      icon: <CommunityIcon />,
    },
    {
      href: "/settings",
      title: t("settings"),
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Nav>
      <List>
        {links.map((link) => (
          <NavigationLink
            key={link.href}
            href={link.href}
            title={link.title}
            icon={link.icon}
            isActive={link.href === router.pathname}
          />
        ))}
      </List>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    padding: 10px;
    margin-right: 20px;

    position: relative;
    right: auto;
    bottom: auto;
    left: auto;

    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
  }
`;

const List = styled.ul`
  display: flex;

  height: 48px;
  margin: 0;
  padding: 0;

  list-style: none;

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    flex-direction: column;

    height: auto;
  }
`;
