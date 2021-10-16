export type Error = null | "empty" | "invalid" | "length";

export type LoginStore = {
  email: string;
  password: string;
  isRemember: boolean;
  errors: {
    email: Error;
    password: Error;
  };
};
