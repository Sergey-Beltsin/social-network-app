import { FC } from "react";
import styled, { useTheme } from "styled-components";
import useTranslation from "next-translate/useTranslation";

import {
  Header as HeaderComponent,
  HeaderLoginButtons,
} from "@/shared/ui/molecules";
import {
  Dropdown,
  DropdownItems,
  DropdownTrigger as DropdownTriggerEnum,
} from "@/shared/ui/atoms";
import { ProfileIcon, SettingsIcon } from "@/shared/lib/icons/navigation";
import { Auth, store } from "@/entities/profile";
import { LangPicker } from "@/features/lang-picker";
import { ThemeSwitcher } from "@/features/theme-switcher";
import { useWindowSize } from "@/shared/lib/hooks";

const RightElementContainer: FC = ({ children }) => (
  <Container>
    <LangPicker />
    {children}
  </Container>
);

export const Header: FC = () => {
  const { useProfileStore } = store;

  const { name, surname } = useProfileStore();
  const { t } = useTranslation("common");
  const theme = useTheme();
  const { isMobile } = useWindowSize();

  const dropdownItems: DropdownItems = [
    {
      icon: <SettingsIcon />,
      title: t("header.settings"),
      link: "/settings",
    },
    {
      render: () => <ThemeSwitcher />,
      lastOfType: true,
    },
    {
      icon: <ProfileIcon fill={theme.colors.red} />,
      title: <RedText>{t("header.logOut")}</RedText>,
      onClick: Auth.clear,
    },
  ];

  const rightElement = (
    <RightElementContainer>
      {Auth.getIsAuth() ? (
        <Dropdown
          items={dropdownItems}
          trigger={
            isMobile ? DropdownTriggerEnum.click : DropdownTriggerEnum.hover
          }
        >
          <DropdownTrigger>
            {/* <DropdownTriggerImg src="https://place-hold.it/30x30" alt="" /> */}
            <Name>
              {name} {surname}
            </Name>
          </DropdownTrigger>
        </Dropdown>
      ) : (
        <HeaderLoginButtons />
      )}
    </RightElementContainer>
  );

  return <HeaderComponent rightElement={rightElement} />;
};

const Container = styled.div`
  display: flex;
  align-items: center;

  & > div:not(:last-child) {
    margin-right: 10px;
  }

  @media (min-width: ${({ theme }) => theme.devices.desktop}) {
    & > div:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const DropdownTrigger = styled.span`
  display: flex;
  align-items: center;
`;

const DropdownTriggerImg = styled.img`
  display: block;

  width: 30px;
  height: 30px;
  margin-right: 10px;

  border-radius: 50%;
`;

const RedText = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

const Name = styled.span`
  overflow: hidden;

  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 14px;
  }
`;
