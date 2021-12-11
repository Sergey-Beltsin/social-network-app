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
  MenuIcon,
} from "@/shared/lib/icons/navigation";
import { store } from "@/entities/profile";
import { useWindowSize } from "@/shared/lib/hooks";

interface ILink {
  href: string | ((query: string) => string);
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
  if (index === 0 && username && getIsProfilePage(username, queryUsername)) {
    return true;
  }

  return (
    pathname === "/[username]" &&
    index === 3 &&
    !!username &&
    !getIsProfilePage(username, queryUsername)
  );
};

const links: Array<ILink> = [
  {
    href: (username: string) => `/${username}`,
    title: "profile",
    icon: <ProfileIcon />,
  },
  {
    href: "/news",
    title: "news",
    icon: <NewsIcon />,
  },
  {
    href: "/messages",
    title: "messages",
    icon: <MessagesIcon />,
  },
  {
    href: "/friends",
    title: "users",
    icon: <UsersIcon />,
  },
  {
    href: "/groups",
    title: "groups",
    icon: <CommunityIcon />,
  },
  {
    href: "/settings",
    title: "settings",
    icon: <SettingsIcon />,
  },
];

const mobileLinks: Array<ILink> = [
  {
    href: (username) => `/${username}`,
    title: "profile",
    icon: <ProfileIcon />,
  },
  {
    href: "/news",
    title: "news",
    icon: <NewsIcon />,
  },
  {
    href: "/messages",
    title: "messages",
    icon: <MessagesIcon />,
  },
  {
    href: "/friends",
    title: "users",
    icon: <UsersIcon />,
  },
  {
    href: "/menu",
    title: "menu",
    icon: <MenuIcon />,
  },
];

export const Navigation = () => {
  const { t } = useTranslation("navigation");
  const router = useRouter();
  const { useProfileStore } = store;
  const { username } = useProfileStore();
  const { isDesktop } = useWindowSize();

  return (
    <Nav>
      <List>
        {(!isDesktop ? mobileLinks : links).map((link, index) => {
          const href =
            typeof link.href === "string" ? link.href : link.href(username);

          return (
            <NavigationLink
              key={href}
              href={href}
              title={t(link.title)}
              icon={link.icon}
              isActive={getIsLinkActive(
                href,
                router.pathname,
                index,
                username,
                router.query.username || "",
              )}
            />
          );
        })}
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

    position: sticky;
    top: 68px;
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
