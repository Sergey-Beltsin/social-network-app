import { FC } from "react";
import type { AppProps } from "next/app";

import { appWithTranslation } from "next-i18next";

import { App } from "@/app/index";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <App>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </App>
);

export default appWithTranslation(MyApp);
