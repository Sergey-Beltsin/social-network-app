export type LoginStore = {
  isRemember: boolean;
  isLoading: boolean;
  error: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type SubmitPayload = {
  email: string;
  password: string;
  isRemember: boolean;
};
