import "styled-components";
import { IDevices } from "@/shared/lib/constants";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      common: {
        dark: string;
        light: string;
      };
      text: {
        primary: string;
        secondary: string;
        white: string;
      };
      components: {
        likesCounterBg: string;
      };
      primary: string;
      secondary: string;
      secondaryLight: string;
      tertiary: string;
      tertiaryLight: string;
      reversed: string;
      border: string;
      borderSecondary: string;
      background: string;
      red: string;
      lightRed: string;
      shadow: string;
    };
    devices: IDevices;
  }
}
