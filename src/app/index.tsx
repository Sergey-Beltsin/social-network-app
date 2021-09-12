import { FC } from "react";
import styled from "styled-components";

import { ThemeProvider } from "@/shared/lib/theme";

import { Navigation } from "@/shared/ui/molecules";

export const App: FC = ({ children }) => (
  <ThemeProvider>
    <MainWrapper>
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
      </Wrapper>
    </MainWrapper>
  </ThemeProvider>
);

const Main = styled.main`
  min-height: calc(100vh - 48px);
  margin: 0 auto;

  color: ${({ theme }) => theme.colors.text};

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    width: 100%;
    min-height: 100vh;
    margin: 0;
  }
`;

const MainWrapper = styled.div`
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
