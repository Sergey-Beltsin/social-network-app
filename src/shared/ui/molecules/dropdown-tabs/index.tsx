import { FC, ReactElement, useState } from "react";
import styled from "styled-components";

import {
  Dropdown,
  DropdownItems,
  DropdownPosition,
  DropdownTrigger,
  TabProps,
} from "@/shared/ui/atoms";

type DropdownTabsProps = {
  children: ReactElement<TabProps>[];
  trigger?: DropdownTrigger;
  position?: DropdownPosition;
  onChange?: (activeTab: number) => void;
};

export const DropdownTabs: FC<DropdownTabsProps> = ({
  children,
  trigger = DropdownTrigger.hover,
  position = DropdownPosition.left,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChangeActiveTab = (tab: number) => {
    setActiveTab(tab);

    if (onChange) {
      onChange(tab);
    }
  };

  const getChildren = (): ReactElement<TabProps>[] => {
    if (Array.isArray(children)) {
      return children;
    }

    return [children];
  };

  const dropdownItems: DropdownItems = getChildren().map((item, index) => ({
    title: item.props.title,
    onClick: () => handleChangeActiveTab(index),
  }));

  return (
    <Container>
      <DropdownWrapper>
        <Dropdown
          items={dropdownItems}
          selectedItem={activeTab}
          trigger={trigger}
          position={position}
        >
          {children[activeTab].props.title}
        </Dropdown>
      </DropdownWrapper>
      {children[activeTab]}
    </Container>
  );
};

const Container = styled.div``;

const DropdownWrapper = styled.div`
  margin-bottom: 20px;
`;
