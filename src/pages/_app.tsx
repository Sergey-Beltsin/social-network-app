import { FC } from "react";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/shared/lib/theme";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
