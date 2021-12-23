import { FC, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import Cookies from "js-cookie";
import useTranslation from "next-translate/useTranslation";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

import { AlertMessage, Container } from "@/shared/ui/atoms";
import { ThemeProvider } from "@/shared/lib/theme";
import { Navigation, Header } from "@/widgets";
import { ProtectedRoute } from "@/shared/lib/hocs";
import { Auth, actions } from "@/entities/profile";

TimeAgo.addLocale(en);
TimeAgo.addLocale(ru);

type MainWrapperProps = {
  notPaddingBottom: boolean;
};

export const App: FC = ({ children }) => {
  const { getProfile } = actions;

  const { t } = useTranslation("common");

  useEffect(() => {
    if (Cookies.get("token")) {
      getProfile();
    }
  }, []);

  return (
    <ThemeProvider>
      <ProtectedRoute>
        <Header />
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <MainWrapper notPaddingBottom={!Auth.getIsAuth()}>
          <AlertWrapper>
            <AlertMessage name="devAlert" hideOnTime={86400}>
              {t("devAlert")}
            </AlertMessage>
          </AlertWrapper>
          <Container>
            {Auth.getIsAuth() && <Navigation />}
            <Main>{children}</Main>
          </Container>
        </MainWrapper>
      </ProtectedRoute>
    </ThemeProvider>
  );
};

const Main = styled.main`
  display: flex;

  min-height: 100%;
  margin: 0 auto;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    width: 100%;
    margin: 0;
  }

  & > div {
    width: 100%;
  }
`;

const AlertWrapper = styled.div`
  margin-bottom: 19px;
`;

const MainWrapper = styled.div<MainWrapperProps>`
  flex-grow: 1;

  padding-top: 49px;
  padding-bottom: ${({ notPaddingBottom }) =>
    notPaddingBottom ? "20px" : "68px"};

  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    padding-bottom: 20px;

    & > ${Container} {
      display: flex;
      align-items: flex-start;
    }
  }
`;
