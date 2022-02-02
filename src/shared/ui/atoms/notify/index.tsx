import { FC } from "react";
import styled from "styled-components";

type NotifyProps = {
  title: string;
  content: string;
};

export const Notify: FC<NotifyProps> = ({ title, content }) => (
  <Container>
    <Title>{title}</Title>
    <Content>{content}</Content>
  </Container>
);

const Container = styled.div``;

const Title = styled.span`
  display: block;

  margin-bottom: 6px;

  font-size: 14px;
  font-weight: 600;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 16px;
  }
`;

const Content = styled.span`
  font-size: 12px;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;
