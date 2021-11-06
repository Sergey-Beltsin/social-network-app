import { FC, ReactElement, useRef, useState } from "react";
import styled from "styled-components";
// @ts-ignore
import { CSSTransition } from "react-transition-group";

import useTranslation from "next-translate/useTranslation";
import { useOutsideAlerter } from "@/shared/lib/hooks";
import { ArrowIcon } from "@/shared/lib/icons/common";

interface IDropdownItem {
  icon?: ReactElement;
  title: string;
  onClick?: () => void;
  isClosable?: boolean;
  endOfType?: boolean;
}

type DropdownItems = Array<IDropdownItem>;

type Props = {
  items: DropdownItems;
};

type TriggerIconProps = {
  isOpen: boolean;
};

type DropdownTriggerProps = {
  isOpen: boolean;
};

export const Dropdown: FC<Props> = ({ items, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClickItem = (onClick?: () => void, isClosable?: boolean) => {
    if (onClick) {
      onClick();
    }

    if (isClosable) {
      handleClose();
    }
  };

  useOutsideAlerter(dropdownRef, handleClose);

  return (
    <MainWrapper ref={dropdownRef}>
      <Trigger
        isOpen={isOpen}
        onClick={handleOpen}
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
      >
        <TriggerContent>{children}</TriggerContent>
        <TriggerIcon isOpen={isOpen}>
          <ArrowIcon />
        </TriggerIcon>
      </Trigger>
      <CSSTransition
        in={isOpen}
        timeout={200}
        unmountOnExit
        classNames="dropdown-content"
      >
        <DropdownContent>
          <DropdownList>
            {items.map((item) => (
              <DropdownItem key={item.title}>
                <DropdownButton
                  onClick={() => handleClickItem(item.onClick, item.isClosable)}
                >
                  <DropdownButtonInfo>
                    {item.icon}
                    <DropdownButtonTitle>{item.title}</DropdownButtonTitle>
                  </DropdownButtonInfo>
                </DropdownButton>
              </DropdownItem>
            ))}
          </DropdownList>
        </DropdownContent>
      </CSSTransition>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  min-width: 200px;
  padding: 10px;

  position: absolute;
  z-index: 100;
  top: calc(100% + 6px);
  right: 0;
  opacity: 1;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  box-shadow: 0 4px 20px -5px rgba(34, 60, 80, 0.4);
  overflow: hidden;

  transition: 0.2s ease;

  &.dropdown-content {
    &-enter {
      opacity: 0;
      transform: translateY(20px);

      &-active {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &-exit {
      opacity: 1;
      transform: translateY(0);

      &-active {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  }
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;
`;

const DropdownItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 6px 14px;

  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text};

  transition: 0.2s ease;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.tertiaryLight};
  }
`;

const DropdownButtonInfo = styled.span`
  display: flex;
  align-items: center;

  margin-right: 20px;
`;

const DropdownButtonTitle = styled.span`
  display: block;

  margin-left: 6px;
`;

const Trigger = styled.button<DropdownTriggerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 6px 10px;

  position: relative;

  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text};

  transition: 0.2s ease;

  ${({ isOpen, theme }) =>
    isOpen ? `background-color: ${theme.colors.tertiary}` : ""}
`;

const TriggerContent = styled.span`
  display: flex;
`;

const TriggerIcon = styled.span<TriggerIconProps>`
  display: block;
  margin-left: 10px;

  transform: rotate(${({ isOpen }) => (isOpen ? -90 : 90)}deg);

  transition: 0.2s ease;
`;
