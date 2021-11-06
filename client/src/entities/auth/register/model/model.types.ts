import { FormEvent } from "react";

export type Error = null | "empty" | "invalid" | "minLength" | "maxLength";

export type RegisterStore = {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
  errors: {
    email: Error;
    password: Error;
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
  event: FormEvent;
};
