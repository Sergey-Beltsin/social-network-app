/* eslint-disable react/no-array-index-key */
import {
  FC,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useOutsideAlerter } from "@/shared/lib/hooks";
import { ArrowIcon } from "@/shared/lib/icons/common";

export enum DropdownPosition {
  left,
  right,
}

export enum DropdownTrigger {
  click,
  hover,
}

interface IDropdownItem {
  icon?: ReactElement;
  title?: string | ReactElement;
  onClick?: () => void;
  link?: string;
  lastOfType?: boolean;
  render?: () => ReactNode;
}

export type DropdownItems = Array<IDropdownItem>;

type DropdownProps = {
  items: DropdownItems;
  trigger?: DropdownTrigger;
  selectedItem?: number;
  position?: DropdownPosition;
};

type TriggerIconProps = {
  isOpen: boolean;
};

type DropdownTriggerProps = {
  isOpen: boolean;
};

type DropdownWrapperProps = {
  position: DropdownPosition;
};

type DropdownItemProps = {
  isSelected: boolean;
  lastOfType: boolean;
  paddings: boolean;
};

export const Dropdown: FC<DropdownProps> = ({
  items,
  trigger = DropdownTrigger.click,
  selectedItem,
  position = DropdownPosition.right,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleChangeOpen = (isCurrentOpen: boolean) => {
    setIsOpen(isCurrentOpen);
  };

  const handleClickItem = (onClick?: () => void, link?: string) => {
    if (onClick) {
      onClick();
    }

    if (link) {
      router.push(link);
      handleChangeOpen(false);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.code === "Space" || event.code === "Enter") {
      handleChangeOpen(!isOpen);
    }
  };

  useOutsideAlerter(dropdownRef, () => handleChangeOpen(false));

  return (
    <MainWrapper ref={dropdownRef}>
      <Trigger
        isOpen={isOpen}
        onClick={() =>
          trigger === DropdownTrigger.click && handleChangeOpen(!isOpen)
        }
        onMouseEnter={() =>
          trigger === DropdownTrigger.hover && handleChangeOpen(true)
        }
        onMouseLeave={() =>
          trigger === DropdownTrigger.hover && handleChangeOpen(false)
        }
        onKeyUp={handleKeyUp}
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
        <DropdownWrapper
          onMouseEnter={
            trigger === DropdownTrigger.hover
              ? () => handleChangeOpen(true)
              : undefined
          }
          onMouseLeave={
            trigger === DropdownTrigger.hover
              ? () => handleChangeOpen(false)
              : undefined
          }
          position={position}
        >
          <DropdownContent>
            <DropdownList>
              {items.map(
                ({ title, lastOfType, onClick, icon, link, render }, index) => (
                  <DropdownItem
                    key={`${index}-${link}-${lastOfType}-dropdown`}
                    isSelected={selectedItem === index}
                    lastOfType={lastOfType || false}
                    paddings={!!render}
                  >
                    {render ? (
                      render()
                    ) : (
                      <DropdownButton
                        onClick={() => handleClickItem(onClick, link)}
                        aria-label={link ? t("goToLink", { link }) : ""}
                      >
                        <DropdownButtonInfo>
                          {icon}
                          <DropdownButtonTitle>{title}</DropdownButtonTitle>
                        </DropdownButtonInfo>
                      </DropdownButton>
                    )}
                  </DropdownItem>
                ),
              )}
            </DropdownList>
          </DropdownContent>
        </DropdownWrapper>
      </CSSTransition>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: fit-content;

  position: relative;
`;

const DropdownWrapper = styled.div<DropdownWrapperProps>`
  position: absolute;
  z-index: 100;
  top: 100%;
  ${({ position }) =>
    position === DropdownPosition.left ? "left: 0;" : "right: 0;"}
  opacity: 1;

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

const DropdownContent = styled.div`
  min-width: 140px;
  padding: 10px;

  position: relative;
  top: 6px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  box-shadow: 0 4px 20px -5px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    min-width: 200px;
  }
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;
`;

const DropdownItem = styled.li<DropdownItemProps>`
  &:not(:first-child) {
    padding-top: 4px;
  }

  &:not(:last-child) {
    padding-bottom: 4px;
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    & ${DropdownButton} {
      background-color: ${theme.colors.tertiaryLight};
    }

    & ${DropdownButtonTitle} {
      color: ${theme.colors.primary};
    }
  `}

  ${({ lastOfType, theme }) =>
    lastOfType &&
    `
    border-bottom: 1px solid ${theme.colors.border};
    
    &:not(:first-child) {
      padding-bottom: 8px;
      margin-bottom: 4px;
    }
  `}
  
  ${({ paddings }) => paddings && "padding: 6px 14px;"}
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 6px 14px;

  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text.primary};

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

  & > svg {
    width: 20px;
    height: 20px;
  }
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

  color: ${({ theme }) => theme.colors.text.primary};

  transition: 0.2s ease;

  ${({ isOpen, theme }) =>
    isOpen ? `background-color: ${theme.colors.tertiary}` : ""}
`;

const TriggerContent = styled.span`
  display: flex;

  font-size: 10px;

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    font-size: 14px;
  }
`;

const TriggerIcon = styled.span<TriggerIconProps>`
  display: block;
  margin-left: 10px;

  transform: rotate(${({ isOpen }) => (isOpen ? -90 : 90)}deg);

  transition: 0.2s ease;
`;
