import { FC, ReactElement } from "react";

import styled from "styled-components";
import {
  Header as HeaderComponent,
  HeaderLoginButtons,
} from "@/shared/ui/molecules";
import { Dropdown } from "@/shared/ui/atoms";
import { NewsIcon } from "@/shared/icons/navigation";
import { useAuth } from "@/shared/lib/hooks";

interface IDropdownItem {
  icon?: ReactElement;
  title: string;
  onClick?: () => void;
  isClosable?: boolean;
  endOfType?: boolean;
}

const dropdownItems: Array<IDropdownItem> = [
  {
    icon: <NewsIcon />,
    title: "Example title 1",
    onClick: () => {
      console.log("example 1 clicked");
    },
  },
  {
    icon: <NewsIcon />,
    title: "Example title 2",
    onClick: () => {
      console.log("example 2 clicked");
    },
  },
  {
    icon: <NewsIcon />,
    title: "Example title 3",
    onClick: () => {
      console.log("example 3 clicked");
    },
  },
];

export const Header: FC = () => {
  const { isAuth } = useAuth();

  const rightElement = isAuth ? (
    <Dropdown items={dropdownItems}>
      <DropdownTrigger>
        <DropdownTriggerImg src="https://place-hold.it/30x30" alt="" />
        <span>Sergey Beltsin</span>
      </DropdownTrigger>
    </Dropdown>
  ) : (
    <HeaderLoginButtons />
  );

  return <HeaderComponent rightElement={rightElement} />;
};

const DropdownTrigger = styled.span`
  display: flex;
  align-items: center;
`;

const DropdownTriggerImg = styled.img`
  display: block;
  margin-right: 10px;
  border-radius: 50%;
`;
