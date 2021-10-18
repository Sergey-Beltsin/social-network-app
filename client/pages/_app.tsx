import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { App } from "@/app/index";

import "@/app/index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();

  // useEffect(() => {
  //   authCheck(router.asPath);
  //
  //   const hideContent = () => setIsAuth(false);
  //   router.events.on("routeChangeStart", hideContent);
  //   router.events.on("routeChangeComplete", authCheck);
  //   router.events.on("routeChangeComplete", (params) => console.log(params));
  //
  //   return () => {
  //     router.events.off("routeChangeStart", hideContent);
  //     router.events.off("routeChangeComplete", authCheck);
  //   };
  // }, []);

  // const authCheck = (url: string) => {
  //   const publicRoutes: Array<string> = ["/login", "/register"];
  //   const path: string = url.split("?")[0];
  //   console.log(path, publicRoutes.includes(path));
  //
  //   if (!publicRoutes.includes(path)) {
  //     setIsAuth(false);
  //     router.push({
  //       pathname: "/login",
  //       query: {
  //         returnUrl: router.asPath,
  //       },
  //     });
  //   } else {
  //     setIsAuth(true);
  //   }
  // };

  return (
    <App>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </App>
  );
};

export default MyApp;
