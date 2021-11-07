import { FC } from "react";
import styled from "styled-components";

import { ThemeProvider } from "@/shared/lib/theme";
import { Navigation } from "@/shared/ui/molecules";
import { Header } from "@/widgets";
import { ProtectedRoute } from "@/shared/lib/hocs";
import { Auth } from "@/shared/lib/utils";

export const App: FC = ({ children }) => (
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

const Main = styled.main`
  display: flex;

  min-height: calc(100vh - 116px);
  margin: 0 auto;

  color: ${({ theme }) => theme.colors.text.primary};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    width: 100%;
    min-height: calc(100vh - 69px);
    margin: 0;
  }
`;

const MainWrapper = styled.div`
  padding-top: 20px;
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
