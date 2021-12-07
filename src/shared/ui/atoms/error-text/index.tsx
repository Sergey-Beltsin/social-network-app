import { FC } from "react";
import styled from "styled-components";

export const ErrorText: FC = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.span`
  display: block;

  margin-top: 4px;
  margin-left: 10px;

  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
`;
