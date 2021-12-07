import { EMAIL_REGEX } from "@/shared/lib/constants/common";

type ValidationSchemeValue = {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
};

export const validationScheme: Record<string, ValidationSchemeValue> = {
  email: {
    pattern: EMAIL_REGEX,
  },
  password: {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,20}$/,
    minLength: 8,
    maxLength: 20,
  },
  name: {
    minLength: 2,
    maxLength: 30,
  },
  surname: {
    minLength: 2,
    maxLength: 30,
  },
  username: {
    minLength: 4,
    maxLength: 16,
  },
};
