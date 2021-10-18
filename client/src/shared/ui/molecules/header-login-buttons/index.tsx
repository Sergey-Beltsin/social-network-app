import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { Button } from "@/shared/ui/atoms";

export const HeaderLoginButtons: FC = () => {
  const { t } = useTranslation("common");

  return (
    <Container>
      <Link href="/login" passHref>
        <Href>
          <Button secondary>{t("signIn")}</Button>
        </Href>
      </Link>
      <Link href="/register" passHref>
        <Href>
          <Button>{t("signUp")}</Button>
        </Href>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Href = styled.a`
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
