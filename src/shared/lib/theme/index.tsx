import { FC } from "react";
import { ThemeProvider as ThemeProviderInstance } from "styled-components";

import type { IDevices } from "@/shared/lib/constants";
import { devices } from "@/shared/lib/constants";

interface IThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  tertiaryLight: string;
  background: string;
  text: string;
  border: string;
}

interface IThemes {
  dark: {
    colors: IThemeColors;
    devices: IDevices;
  };
  light: {
    colors: IThemeColors;
    devices: IDevices;
  };
}

const primary: string = "#3788E0";
const secondaryWhite: string = "#E8E8E8";
const secondary: string = "#222222";
const tertiaryWhite: string = "#C7C7C7";
const tertiary: string = "#555555";
const tertiaryLightWhite: string = "#e0e0e0";
const tertiaryLight: string = "#4d4d4d";
const text: string = "#333333";
const textWhite: string = "#CCCCCC";
const borderWhite: string = "#CECECE";
const border: string = "#333333";
const backgroundWhite: string = "#EEEEEE";
const background: string = "#151515";

const themes: IThemes = {
  dark: {
    colors: {
      primary,
      secondary,
      tertiary,
      tertiaryLight,
      text: textWhite,
      border,
      background,
    },
    devices,
  },
  light: {
    colors: {
      primary,
      secondary: secondaryWhite,
      tertiary: tertiaryWhite,
      tertiaryLight: tertiaryLightWhite,
      text,
      border: borderWhite,
      background: backgroundWhite,
    },
    devices,
  },
};

export const ThemeProvider: FC = ({ children }) => {
  const currentTheme: string = "light";

  return (
    // @ts-ignore
    <ThemeProviderInstance theme={themes[currentTheme]}>
      {children}
    </ThemeProviderInstance>
  );
};
