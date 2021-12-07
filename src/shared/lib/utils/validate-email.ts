import { EMAIL_REGEX } from "@/shared/lib/constants";

export const validateEmail = (email: string): boolean =>
  EMAIL_REGEX.test(email.toLowerCase());
