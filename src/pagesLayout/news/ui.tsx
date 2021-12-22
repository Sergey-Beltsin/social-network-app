import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { NewsList } from "@/features/news";

export const NewsPage: NextPage = () => {
  const { t } = useTranslation("news");

  return (
    <Container>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <NewsList postsTitle={t("title")} />
    </Container>
  );
};

const Container = styled.div``;
