import { FC } from "react";
import styled from "styled-components";

type TitleProps = {
  center?: boolean;
};

export const Title: FC<TitleProps> = ({ children, center }) => (
  <Container center={center}>{children}</Container>
);

const Container = styled.h3<TitleProps>`
  margin-top: 0;
  margin-bottom: 20px;

  font-size: 16px;
  ${({ center }) => center && "text-align: center;"}

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 20px;
  }
`;
