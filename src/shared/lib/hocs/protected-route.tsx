import { FC, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { publicRoutes } from "@/shared/lib/constants";
import { Auth, store } from "@/entities/profile";

export const ProtectedRoute: FC = ({ children }) => {
  const [isPageAccessed, setIsPageAccessed] = useState(false);
  const router = useRouter();
  const { useProfileStore } = store;
  const { username } = useProfileStore();

  useEffect(() => {
    authCheck(router.asPath);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  const authCheck = (url: string) => {
    let path: string = url.split("?")[0];

    if (
      router.locales?.find((locale) =>
        path.split("/").find((item) => item === locale),
      )
    ) {
      path = path.slice(3);
    }

    if (!publicRoutes.includes(path) && !Auth.getIsAuth()) {
      setIsPageAccessed(false);

      if (path !== "/") {
        localStorage.setItem("returningUrl", JSON.stringify(path));
      }

      router.push("/login");
    } else if (publicRoutes.includes(path) && Auth.getIsAuth()) {
      setIsPageAccessed(false);

      router.push(username || "/");
    } else {
      setIsPageAccessed(true);
    }
  };

  return (isPageAccessed && (children as ReactElement)) || <></>;
};
