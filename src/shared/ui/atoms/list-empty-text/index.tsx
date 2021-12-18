import { FC } from "react";
import styled from "styled-components";

export const ListEmptyText: FC = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 10px;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    font-size: 12px;
  }
`;
