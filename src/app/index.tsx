import { FC, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

import { Container } from "@/shared/ui/atoms";
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

  useEffect(() => {
    if (Cookies.get("token")) {
      getProfile();
    }
  }, []);

  return (
    <ThemeProvider>
      <ProtectedRoute>
        <Header />
        <MainWrapper notPaddingBottom={!Auth.getIsAuth()}>
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

  min-height: calc(100vh - 136px);
  margin: 0 auto;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    width: 100%;
    min-height: calc(100vh - 88px);
    margin: 0;
  }

  & > div {
    width: 100%;
  }
`;

const MainWrapper = styled.div<MainWrapperProps>`
  padding-top: 68px;
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
