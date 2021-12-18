import { FC } from "react";
import { ThemeProvider as ThemeProviderInstance } from "styled-components";

import { devices } from "@/shared/lib/constants";
import { useTheme } from "@/shared/lib/hooks";

const primary: string = "#3788E0";
const secondaryWhite: string = "#EEEEEE";
const secondary: string = "#222222";
const secondaryLightWhite: string = "#E5E5E5";
const secondaryLight: string = "#2F2F2F";
const tertiaryWhite: string = "#C7C7C7";
const tertiary: string = "#555555";
const tertiaryLightWhite: string = "#D5D5D5";
const tertiaryLight: string = "#4D4D4D";
const reversed: string = "#EEEEEE";
const reversedWhite: string = "#222222";
const text: string = "#333333";
const textWhite: string = "#E2E2E2";
const textSecondary: string = "#AAAAAA";
const borderWhite: string = "#CECECE";
const border: string = "#333333";
const borderSecondary: string = "#7F7F7F";
const backgroundWhite: string = "#F6F6F6";
const background: string = "#151515";
const lightRed: string = "rgb(255, 237, 237)";
const red: string = "rgb(255, 51, 71)";
const likesCounterBgWhite: string = "#DEDEDE";
const likesCounterBg: string = "#363636";
const shadow: string = "rgba(120, 120, 120, 0.2)";
const shadowWhite: string = "rgba(38, 38, 38, 0.4)";

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
        white: textWhite,
      },
      components: {
        likesCounterBg,
      },
      primary,
      secondary,
      secondaryLight,
      tertiary,
      tertiaryLight,
      reversed,
      border,
      borderSecondary,
      background,
      red,
      lightRed,
      shadow,
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
        white: textWhite,
      },
      components: {
        likesCounterBg: likesCounterBgWhite,
      },
      primary,
      secondary: secondaryWhite,
      secondaryLight: secondaryLightWhite,
      tertiary: tertiaryWhite,
      tertiaryLight: tertiaryLightWhite,
      reversed: reversedWhite,
      border: borderWhite,
      borderSecondary,
      background: backgroundWhite,
      red,
      lightRed,
      shadow: shadowWhite,
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
