import { FC } from "react";
import styled from "styled-components";

import useTranslation from "next-translate/useTranslation";
import { actions, store } from "../model";
import { Button, Checkbox, Input } from "@/shared/ui/atoms";

export const LoginForm: FC = () => {
  const { useLoginStore } = store;
  const {
    handleChangeEmail,
    handleChangePassword,
    handleChangeIsRemember,
    handleBlurEmail,
    handleBlurPassword,
  } = actions;
  const { email, password, isRemember, errors } = useLoginStore();
  const { t } = useTranslation("auth");

  return (
    <Form>
      <Input
        value={email}
        onChange={handleChangeEmail}
        label={t("email")}
        onBlur={handleBlurEmail}
        error={errors.email ? t(`errors.${errors.email}`) : ""}
        required
      />
      <Input
        value={password}
        onChange={handleChangePassword}
        label={t("password")}
        onBlur={handleBlurPassword}
        error={
          errors.password ? t(`errors.${errors.password}`, { count: 8 }) : ""
        }
        required
      />
      <Checkbox
        checked={isRemember}
        onChange={handleChangeIsRemember}
        label={t("isRemember")}
      />
      <Button>{t("signIn")}</Button>
    </Form>
  );
};

const Form = styled.form`
  & > button {
    margin: 20px auto 0;
  }
`;
