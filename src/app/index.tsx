import { FC, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

import { ThemeProvider } from "@/shared/lib/theme";
import { Navigation, Header } from "@/widgets";
import { ProtectedRoute } from "@/shared/lib/hocs";
import { Auth, actions } from "@/entities/profile";

TimeAgo.addLocale(en);
TimeAgo.addLocale(ru);

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
        <MainWrapper>
          <Wrapper>
            {Auth.getIsAuth() && <Navigation />}
            <Main>{children}</Main>
          </Wrapper>
        </MainWrapper>
      </ProtectedRoute>
    </ThemeProvider>
  );
};

const Main = styled.main`
  display: flex;

  min-height: calc(100vh - 116px);
  margin: 0 auto;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    width: 100%;
    min-height: calc(100vh - 89px);
    margin: 0;
  }
`;

const MainWrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;

  background-color: ${({ theme }) => theme.colors.background};
`;

const Wrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    display: flex;
    align-items: flex-start;

    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
  }
`;
