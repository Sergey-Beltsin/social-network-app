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
  UsersIcon,
} from "@/shared/lib/icons/navigation";
import { store } from "@/entities/profile";

interface ILink {
  href: string;
  title: string;
  icon: ReactElement;
}

const getIsProfilePage = (username: string, queryUsername: string | string[]) =>
  username ===
  (Array.isArray(queryUsername) ? queryUsername.join("") : queryUsername);

const getIsLinkActive = (
  href: string,
  pathname: string,
  index: number,
  username: string,
  queryUsername: string | string[],
): boolean => {
  if (href === pathname) {
    return true;
  }
  if (index === 0 && getIsProfilePage(username, queryUsername)) {
    return true;
  }

  return (
    pathname === "/[username]" &&
    index === 3 &&
    !getIsProfilePage(username, queryUsername)
  );
};

export const Navigation = () => {
  const { t } = useTranslation("navigation");
  const router = useRouter();
  const { useProfileStore } = store;
  const { username } = useProfileStore();

  const links: Array<ILink> = [
    {
      href: `/${username}`,
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
      href: "/friends",
      title: t("users"),
      icon: <UsersIcon />,
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
        {links.map((link, index) => (
          <NavigationLink
            key={link.href}
            href={link.href}
            title={link.title}
            icon={link.icon}
            isActive={getIsLinkActive(
              link.href,
              router.pathname,
              index,
              username,
              router.query.username || "",
            )}
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
