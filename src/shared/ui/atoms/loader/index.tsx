import { FC } from "react";
import styled from "styled-components";

type LoaderProps = {
  center?: boolean;
};

export const Loader: FC<LoaderProps> = ({ center }) => (
  <MainWrapper center={center}>
    <Container>
      <div />
      <div />
      <div />
      <div />
    </Container>
  </MainWrapper>
);

const MainWrapper = styled.div<{ center?: boolean }>`
  ${({ center }) =>
    center &&
    `
    display: flex;
    justify-content: center;
    
    margin: 0 20px;
  `}
`;

const Container = styled.div`
  position: relative;

  width: 30px;
  height: 6px;

  & > div {
    position: absolute;
    top: 0;

    width: 6px;
    height: 6px;

    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;

    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    @media (min-width: ${({ theme }) => theme.devices.tablet}) {
      width: 8px;
      height: 8px;
    }
  }

  & > div:nth-child(1) {
    left: 6px;

    animation: ellipsis-anim1 0.6s infinite;
  }

  & > div:nth-child(2) {
    left: 6px;

    animation: ellipsis-anim2 0.6s infinite;
  }

  & > div:nth-child(3) {
    left: 14px;

    animation: ellipsis-anim2 0.6s infinite;
  }

  & > div:nth-child(4) {
    left: 22px;

    animation: ellipsis-anim3 0.6s infinite;
  }

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    width: 40px;
    height: 8px;

    & > div:nth-child(1) {
      left: 8px;
    }

    & > div:nth-child(2) {
      left: 8px;

      animation: ellipsis-anim2-desktop 0.6s infinite;
    }

    & > div:nth-child(3) {
      left: 20px;

      animation: ellipsis-anim2-desktop 0.6s infinite;
    }

    & > div:nth-child(4) {
      left: 32px;
    }
  }

  @keyframes ellipsis-anim1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes ellipsis-anim3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes ellipsis-anim2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(8px, 0);
    }
  }

  @keyframes ellipsis-anim2-desktop {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(12px, 0);
    }
  }
`;
