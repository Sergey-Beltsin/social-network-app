import { FC, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const ProtectedRoute: FC = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setIsAuth(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);
    router.events.on("routeChangeComplete", (params) => console.log(params));

    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  const authCheck = (url: string) => {
    const publicRoutes: Array<string> = ["/login", "/register"];
    const path: string = url.split("?")[0];
    console.log(path, publicRoutes.includes(path));

    if (!publicRoutes.includes(path)) {
      setIsAuth(false);
      router.push({
        pathname: "/login",
        query: {
          returnUrl: router.asPath,
        },
      });
    } else {
      setIsAuth(true);
    }
  };

  return (isAuth && (children as ReactElement)) || <></>;
};
