import { FC, useLayoutEffect, useState } from "react";
import styled from "styled-components";

import { LocalStorage } from "@/shared/lib/utils";
import { Container } from "@/shared/ui/atoms";

type AlertMessageProps = {
  isVisible?: boolean;
  onChange?: (isVisible: boolean) => void;
  // Expected time in seconds
  hideOnTime?: number;
  name: string;
};

export const AlertMessage: FC<AlertMessageProps> = ({
  isVisible: isDefaultVisible = true,
  onChange,
  hideOnTime,
  name,
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(isDefaultVisible || true);

  const handleClose = () => {
    setIsVisible(false);

    if (onChange) {
      onChange(false);
    }

    if (hideOnTime) {
      LocalStorage.set(name, "hidden", hideOnTime);
    }
  };

  useLayoutEffect(() => {
    if (LocalStorage.get(name)) {
      setIsVisible(false);

      if (onChange) {
        onChange(false);
      }
    }
  }, []);

  if (!isVisible) {
    return <></>;
  }

  return (
    <ComponentContainer>
      <Container>
        <Content>
          <Text>{children}</Text>
          <Button type="button" onClick={handleClose} />
        </Content>
      </Container>
    </ComponentContainer>
  );
};

const ComponentContainer = styled.div`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.primary};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 14px 0;
`;

const Text = styled.span`
  display: block;

  margin-right: 10px;

  color: ${({ theme }) => theme.colors.text.white};
`;

const Button = styled.button`
  display: block;
  flex-shrink: 0;

  position: relative;

  width: 24px;
  height: 24px;

  background-color: transparent;
  border: none;
  cursor: pointer;

  &::after,
  &::before {
    content: "";

    position: absolute;
    top: 50%;
    left: 2px;
    right: 2px;

    height: 2px;

    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.common.light};
  }

  &::after {
    transform: rotate(45deg);
  }

  &::before {
    transform: rotate(-45deg);
  }
`;
