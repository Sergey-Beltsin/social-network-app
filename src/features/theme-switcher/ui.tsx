import { ChangeEvent, FC } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { handleChangeTheme, useTheme } from "@/shared/lib/hooks";

type SwitchType = "light" | "auto" | "dark";
type SwitcherProps = {
  switchType: SwitchType;
};

const getIconBySwitchType = (type: SwitchType): string => {
  if (type === "light") {
    return "sun";
  }
  if (type === "auto") {
    return "auto";
  }

  return "moon";
};

const getMarginBySwitchType = (type: SwitchType): number => {
  if (type === "light") {
    return 2;
  }
  if (type === "auto") {
    return 34;
  }

  return 66;
};

export const ThemeSwitcher: FC = () => {
  const { value } = useTheme();
  const { t } = useTranslation("common");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeTheme(event.target.value as SwitchType);
  };

  return (
    <Container>
      <Fieldset>
        <Legend className="visually-hidden">
          {t("header.themeSwitcher.scheme")}
        </Legend>
        <Switcher
          type="radio"
          name="color-scheme"
          value="light"
          aria-label={t("header.themeSwitcher.light")}
          onChange={onChange}
          checked={value === "light"}
          switchType="light"
        />
        <Switcher
          type="radio"
          name="color-scheme"
          value="auto"
          aria-label={t("header.themeSwitcher.auto")}
          onChange={onChange}
          checked={value === "auto"}
          switchType="auto"
        />
        <Switcher
          type="radio"
          name="color-scheme"
          value="dark"
          aria-label={t("header.themeSwitcher.dark")}
          onChange={onChange}
          checked={value === "dark"}
          switchType="dark"
        />
        <Status />
      </Fieldset>
    </Container>
  );
};

const Container = styled.div``;

const Fieldset = styled.fieldset`
  display: flex;
  align-items: center;

  position: relative;

  width: fit-content;
  padding: 2px;
  margin: 0;

  border: none;
  border-radius: 4px;
`;

const Legend = styled.legend``;

const Switcher = styled.input<SwitcherProps>`
  width: 32px;
  height: 32px;
  margin: 0;

  position: relative;
  z-index: 1;

  appearance: none;
  filter: invert(0);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 24px;
  cursor: pointer;

  transition: 0.2s ease-in-out;

  &:checked {
    filter: invert(1);
  }

  ${({ switchType }) => `
    background-image: url('/assets/icons/header/${getIconBySwitchType(
      switchType,
    )}.svg');

    &:checked ~ ${Status}::after {
      left: ${getMarginBySwitchType(switchType)}px;
    }
  `}
`;

const Status = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  filter: invert(0);

  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 6px;

  &::after {
    content: "";

    position: absolute;
    top: 2px;

    width: 32px;
    height: 32px;

    background-color: #000000;
    border-radius: 50px;
    filter: invert(0);

    transition: 0.2s ease-in-out;
  }
`;
