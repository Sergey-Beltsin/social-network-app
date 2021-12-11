import { FC, ReactNode } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

import { handleChangeTheme, useTheme } from "@/shared/lib/hooks";
import { AutoIcon, MoonIcon, SunIcon } from "@/shared/lib/icons/common/theme";

type SwitchType = "light" | "auto" | "dark";
type ThemeItem = {
  label: string;
  value: SwitchType;
  icon: ReactNode;
};
type ButtonProps = {
  isActive: boolean;
};

const themes: ThemeItem[] = [
  {
    label: "light",
    value: "light",
    icon: <SunIcon />,
  },
  {
    label: "auto",
    value: "auto",
    icon: <AutoIcon />,
  },
  {
    label: "dark",
    value: "dark",
    icon: <MoonIcon />,
  },
];

export const ThemeSwitcher: FC = () => {
  const { value } = useTheme();
  const { t } = useTranslation("common");

  const onChange = (currentValue: SwitchType) => {
    handleChangeTheme(currentValue);
  };

  return (
    <Container>
      {themes.map(({ label, value: themeValue, icon }) => (
        <Button
          aria-label={t(`header.themeSwitcher.${label}`)}
          onClick={() => onChange(themeValue)}
          isActive={themeValue === value}
        >
          {icon}
        </Button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  position: relative;

  width: fit-content;
  margin: 0;

  border: none;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.secondaryLight};
`;

const Button = styled.button<ButtonProps>`
  padding: 2px 6px;

  background-color: transparent;
  border: none;
  cursor: pointer;

  transition: 0.2s ease;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  & > svg {
    position: relative;
    top: 1px;

    width: 24px;
    height: 24px;

    filter: invert(0);

    color: ${({ theme }) => theme.colors.text.primary};

    transition: 0.2s ease;
  }

  ${({ isActive, theme }) =>
    isActive
      ? `
    background-color: ${theme.colors.reversed};

    & > svg {
      filter: invert(1);
    }
  `
      : `
    &:hover,
    &:focus {
      background-color: ${theme.colors.tertiary};
    }
  `}
`;
