export type Error =
  | null
  | "empty"
  | "invalid"
  | "invalidEmail"
  | "minLength"
  | "passwordMismatch"
  | "maxLength"
  | "alreadyExists";

export type RegisterStoreField =
  | "email"
  | "password"
  | "repeatedPassword"
  | "username"
  | "name"
  | "surname";

export type RegisterStore = {
  email: string;
  password: string;
  repeatedPassword: string;
  username: string;
  name: string;
  surname: string;
  errors: {
    email: Error;
    password: Error;
    repeatedPassword: Error;
    username: Error;
    name: Error;
    surname: Error;
  };
};

export type SubmitPayload = {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
};
