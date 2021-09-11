import "../styles/globals.css";
import type { AppProps } from "next/app";
import { FC } from "react";

const MyApp: FC = ({ Component, pageProps }: AppProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);

export default MyApp;
