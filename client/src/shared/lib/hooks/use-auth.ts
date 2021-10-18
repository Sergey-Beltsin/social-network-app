import { useState } from "react";

type AuthManager = {
  setAuth(auth: boolean): void;
};

type AuthResponse = {
  isAuth: boolean;
  authManager: AuthManager;
};

export const useAuth = (): AuthResponse => {
  const [isAuth, setIsAuth] = useState<boolean>(true);

  const authManager: AuthManager = {
    setAuth(auth: boolean) {
      setIsAuth(auth);
    },
  };

  return { isAuth, authManager };
};
