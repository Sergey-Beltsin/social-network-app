export type Error = null | "empty" | "invalid" | "length" | "invalidEmail";
export type LoginStoreField = "email" | "password";

export type LoginStore = {
  email: string;
  password: string;
  isRemember: boolean;
  errors: {
    email: Error;
    password: Error;
  };
};

export type SubmitPayload = {
  email: string;
  password: string;
};
