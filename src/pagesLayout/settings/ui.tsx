import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

export const SettingsPage: NextPage = () => {
  const { t } = useTranslation("settings");

  return (
    <Container>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
    </Container>
  );
};

const Container = styled.div``;
