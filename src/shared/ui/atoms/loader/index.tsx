import { FC } from "react";
import styled from "styled-components";

export const Loader: FC = () => (
  <Container>
    <div />
    <div />
    <div />
    <div />
  </Container>
);

const Container = styled.div`
  position: relative;

  width: 40px;
  height: 8px;

  & > div {
    position: absolute;
    top: 0;

    width: 8px;
    height: 8px;

    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;

    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  & > div:nth-child(1) {
    left: 8px;

    animation: lds-ellipsis1 0.6s infinite;
  }

  & > div:nth-child(2) {
    left: 8px;

    animation: lds-ellipsis2 0.6s infinite;
  }

  & > div:nth-child(3) {
    left: 20px;

    animation: lds-ellipsis2 0.6s infinite;
  }

  & > div:nth-child(4) {
    left: 32px;

    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(12px, 0);
    }
  }
`;
