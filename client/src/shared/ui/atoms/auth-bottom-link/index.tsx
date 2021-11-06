import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

type AuthBottomLinkProps = {
  href: string;
  linkText: string;
  text: string;
};

export const AuthBottomLink: FC<AuthBottomLinkProps> = ({
  href,
  linkText,
  text,
}) => (
  <Container>
    <Link href={href}>{linkText}</Link>
    {text}
  </Container>
);

const Container = styled.span`
  display: block;

  margin-top: 18px;
  margin-bottom: 20px;

  & > a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
