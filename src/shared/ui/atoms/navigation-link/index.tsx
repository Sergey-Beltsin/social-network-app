import Link from "next/link";
import { FC, ReactElement } from "react";
import styled from "styled-components";

type Props = {
  href: string;
  title: string;
  icon: ReactElement;
};

export const NavigationLink: FC<Props> = ({ href, icon, title }) => (
  <Item>
    <Link href={href} passHref>
      <LinkItem>
        {icon}
        <Title>{title}</Title>
      </LinkItem>
    </Link>
  </Item>
);

const Item = styled.li``;

const LinkItem = styled.a``;

const Title = styled.span``;
