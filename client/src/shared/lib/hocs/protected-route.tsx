import { FC, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { publicRoutes } from "@/shared/lib/constants";
import { Auth } from "@/shared/lib/utils";

export const ProtectedRoute: FC = ({ children }) => {
  const [isPageAccessed, setIsPageAccessed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    authCheck(router.asPath);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  const authCheck = (url: string) => {
    let path: string = url.split("?")[0];

    if (router.locales?.find((locale) => path.includes(locale))) {
      path = path.slice(3);
    }

    console.log(
      path,
      publicRoutes.find((route) => route.includes(path)),
      router.locale,
      router.locales?.find((locale) => path.includes(locale)),
    );
    if (!publicRoutes.includes(path) && !Auth.getIsAuth()) {
      setIsPageAccessed(false);
      localStorage.setItem("returningUrl", JSON.stringify(path));

      router.push("/login");
    } else if (publicRoutes.includes(path) && Auth.getIsAuth()) {
      setIsPageAccessed(false);

      router.push("/profile");
    } else {
      setIsPageAccessed(true);
    }
  };

  return (isPageAccessed && (children as ReactElement)) || <></>;
};
