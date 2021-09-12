import { FC, ReactElement } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import { MessagesIcon, NewsIcon } from "@/shared/icons/navigation";
import { NavigationLink } from "@/shared/ui/atoms";

interface ILink {
  href: string;
  title: string;
  icon: ReactElement;
}

export const Navigation: FC = () => {
  const { t } = useTranslation("common");
  console.log(t);

  const links: Array<ILink> = [
    {
      href: "/",
      title: "helloWorld",
      icon: <NewsIcon />,
    },
    {
      href: "/messages",
      title: "helloWorld",
      icon: <MessagesIcon />,
    },
  ];

  return (
    <List>
      {links.map((link) => (
        <NavigationLink
          key={link.href}
          href={link.href}
          title={t(link.title)}
          icon={link.icon}
        />
      ))}
    </List>
  );
};
const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;
`;
