import { FC, ReactElement } from "react";
import styled from "styled-components";

import { Container } from "@/shared/ui/atoms";

type HeaderProps = {
  rightElement: ReactElement;
};

export const Header: FC<HeaderProps> = ({ rightElement }) => (
  <HeaderComponent>
    <Container>
      <Title>My Social Network =)</Title>
      {rightElement}
    </Container>
  </HeaderComponent>
);

const HeaderComponent = styled.header`
  display: flex;

  height: 48px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  & > ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;
