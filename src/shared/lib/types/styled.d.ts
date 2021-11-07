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
      };
      components: {
        likesCounterBg: string;
      };
      primary: string;
      secondary: string;
      tertiary: string;
      tertiaryLight: string;
      border: string;
      borderSecondary: string;
      red: string;
      lightRed: string;
    };
    devices: IDevices;
  }
}
