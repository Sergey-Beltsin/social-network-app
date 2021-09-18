import { FC, ReactElement } from "react";
import styled from "styled-components";

import { Container, Dropdown } from "@/shared/ui/atoms";
import { NewsIcon } from "@/shared/icons/navigation";

interface IDropdownItem {
  icon?: ReactElement;
  title: string;
  onClick?: () => void;
  isClosable?: boolean;
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

export const Header: FC = () => (
  <HeaderComponent>
    <Container>
      <img src="https://place-hold.it/100x30" alt="" />
      <Dropdown items={dropdownItems}>
        <DropdownTrigger>
          <DropdownTriggerImg src="https://place-hold.it/30x30" alt="" />
          <span>Sergey Beltsin</span>
        </DropdownTrigger>
      </Dropdown>
    </Container>
  </HeaderComponent>
);

const HeaderComponent = styled.header`
  display: flex;

  height: 48px;

  background-color: ${({ theme }) => theme.colors.secondary};

  & > ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const DropdownTrigger = styled.span`
  display: flex;
  align-items: center;
`;

const DropdownTriggerImg = styled.img`
  display: block;
  margin-right: 10px;
  border-radius: 50%;
`;
