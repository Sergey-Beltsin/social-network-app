import { ThemeProvider as ThemeProviderInstance } from "styled-components";
import { FC } from "react";

interface IThemeColors {
  primary: string
}

interface IThemes {
  dark: IThemeColors
  light: IThemeColors
}

const primary: string = '#111111';

const themes: IThemes = {
  dark: {
    primary,
  },
  light: {
    primary,
  }
}

export const ThemeProvider: FC = ({ children }) => {
  const currentTheme: string = 'dark';

  return (
    <ThemeProviderInstance theme={themes[currentTheme]}>
      {children}
    </ThemeProviderInstance>
  )
}
