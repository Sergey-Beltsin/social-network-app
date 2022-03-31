import { FC, ReactNode } from "react";
import styled from "styled-components";
import Link from "next/link";

import { GithubIcon } from "@/shared/lib/icons/social";

type SocialItem = {
  link: string;
  icon: ReactNode;
};

export const SocialList: FC = () => {
  const socialItems: SocialItem[] = [
    {
      link: "https://github.com/Sergey-Beltsin/social-network-app",
      icon: <GithubIcon />,
    },
  ];

  return (
    <Container>
      {socialItems.map((item) => (
        <Item key={item.link}>
          <Link href={item.link} passHref>
            <Href target="_blank" rel="noreferrer">
              {item.icon}
            </Href>
          </Link>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  align-items: center;

  padding: 0;
  margin: 0;

  list-style: none;
`;

const Item = styled.li``;

const Href = styled.a`
  display: block;

  width: 32px;
  height: 32px;

  opacity: 1;

  transition: 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.6;
  }

  & > svg {
    width: 32px;
    height: 32px;

    color: ${({ theme }) => theme.colors.text.primary};

    transition: 0.2s ease;
  }
`;
