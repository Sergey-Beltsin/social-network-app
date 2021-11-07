import { FC } from "react";
import { ThemeProvider as ThemeProviderInstance } from "styled-components";

import { devices } from "@/shared/lib/constants";
import { useTheme } from "@/shared/lib/hooks";

const primary: string = "#3788E0";
const secondaryWhite: string = "#eeeeee";
const secondary: string = "#222222";
const tertiaryWhite: string = "#C7C7C7";
const tertiary: string = "#555555";
const tertiaryLightWhite: string = "#e0e0e0";
const tertiaryLight: string = "#4d4d4d";
const text: string = "#333333";
const textWhite: string = "#e2e2e2";
const textSecondary: string = "#AAAAAA";
const borderWhite: string = "#CECECE";
const border: string = "#333333";
const borderSecondary: string = "#7f7f7f";
const backgroundWhite: string = "#f6f6f6";
const background: string = "#151515";
const lightRed: string = "rgb(255, 237, 237)";
const red: string = "rgb(255, 51, 71)";
const likesCounterBgWhite: string = "#dedede";
const likesCounterBg: string = "#363636";

const themes = {
  dark: {
    colors: {
      common: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      text: {
        primary: textWhite,
        secondary: textSecondary,
      },
      components: {
        likesCounterBg,
      },
      primary,
      secondary,
      tertiary,
      tertiaryLight,
      border,
      borderSecondary,
      background,
      red,
      lightRed,
    },
    devices,
  },
  light: {
    colors: {
      common: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      text: {
        primary: text,
        secondary: textSecondary,
      },
      components: {
        likesCounterBg: likesCounterBgWhite,
      },
      primary,
      secondary: secondaryWhite,
      tertiary: tertiaryWhite,
      tertiaryLight: tertiaryLightWhite,
      border: borderWhite,
      borderSecondary,
      background: backgroundWhite,
      red,
      lightRed,
    },
    devices,
  },
};

export const ThemeProvider: FC = ({ children }) => {
  const { providedValue } = useTheme();

  return (
    // @ts-ignore
    <ThemeProviderInstance theme={themes[providedValue]}>
      {children}
    </ThemeProviderInstance>
  );
};
