import type { NextPage } from "next";
import styled from "styled-components";
import Head from "next/head";

import useTranslation from "next-translate/useTranslation";
import { NewsList } from "@/features/news";

export const NewsPage: NextPage = () => {
  const { t } = useTranslation("news");

  return (
    <Container>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <NewsList />
    </Container>
  );
};

const Container = styled.div``;
