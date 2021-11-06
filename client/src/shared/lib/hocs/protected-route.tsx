import { FC, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { publicRoutes } from "@/shared/lib/constants";

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
    const path: string = url.split("?")[0];

    if (!publicRoutes.includes(path) && !Cookies.get("token")) {
      setIsPageAccessed(false);
      localStorage.setItem("returningUrl", JSON.stringify(path));

      router.push("/login");
    } else if (publicRoutes.includes(path) && Cookies.get("token")) {
      setIsPageAccessed(false);

      router.push("/");
    } else {
      setIsPageAccessed(true);
    }
  };

  return (isPageAccessed && (children as ReactElement)) || <></>;
};
