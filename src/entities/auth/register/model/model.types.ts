export type RegisterStore = {
  isLoading: boolean;
  error: string;
};

export type SubmitPayload = {
  email: string;
  password: string;
  username: string;
  name: string;
  surname: string;
};

export type RegisterFormType = SubmitPayload & {
  repeatPassword: string;
};
