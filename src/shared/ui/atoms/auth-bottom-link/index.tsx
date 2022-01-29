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
    <Link href={href} passHref>
      <Href>{linkText}</Href>
    </Link>
    {text}
  </Container>
);

const Container = styled.span`
  display: block;

  margin-top: 14px;
  margin-bottom: 14px;

  font-size: 14px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    margin-top: 18px;
    margin-bottom: 20px;

    font-size: 16px;
  }
`;

const Href = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`;
