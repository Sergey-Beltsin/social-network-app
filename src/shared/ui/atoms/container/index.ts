import styled from "styled-components";

type ContainerProps = {
  stretchDesktop?: boolean;
  flexCenter?: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;

  ${({ flexCenter }) =>
    flexCenter &&
    `
    display: flex;
    align-items: center;
  `}

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    ${({ stretchDesktop }) => stretchDesktop && "width: 100%;"}
  }
`;
