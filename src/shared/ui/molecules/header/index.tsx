import { FC, ReactElement } from "react";
import styled from "styled-components";

import { Container, SocialList } from "@/shared/ui/atoms";

type HeaderProps = {
  rightElement: ReactElement;
};

export const Header: FC<HeaderProps> = ({ rightElement }) => (
  <HeaderComponent>
    <Container>
      <SocialList />
      {rightElement}
    </Container>
  </HeaderComponent>
);

const HeaderComponent = styled.header`
  display: flex;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 11;

  height: 48px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  & > ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
