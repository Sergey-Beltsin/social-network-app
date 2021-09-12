import { FC } from "react";
import styled from "styled-components";

import { ThemeProvider } from "@/shared/lib/theme";

import { Header } from "@/widgets/header/ui";

export const App: FC = ({ children }) => (
  <ThemeProvider>
    <Header />
    <Main>{children}</Main>
  </ThemeProvider>
);

const Main = styled.main``;
