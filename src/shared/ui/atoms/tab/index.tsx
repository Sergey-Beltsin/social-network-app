import { FC } from "react";
import styled from "styled-components";

export type TabProps = {
  title: string;
};

export const Tab: FC<TabProps> = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.div``;
