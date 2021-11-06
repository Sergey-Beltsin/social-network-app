import { FC } from "react";
import styled from "styled-components";

import useTranslation from "next-translate/useTranslation";
import { loginModel } from "../model";
import { AuthBottomLink, Button, Checkbox, Input } from "@/shared/ui/atoms";

export const LoginForm: FC = () => {
  const { useLoginStore } = loginModel.store;
  const {
    handleChangeEmail,
    handleChangePassword,
    handleChangeIsRemember,
    handleBlurEmail,
    handleBlurPassword,
    handleSubmit,
  } = loginModel.actions;
  const { email, password, isRemember, errors } = useLoginStore();
  const { t } = useTranslation("auth");

  return (
    <MainWrapper>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
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
              errors.password
                ? t(`errors.${errors.password}`, { count: 8 })
                : ""
            }
            required
          />
          <Checkbox
            checked={isRemember}
            onChange={handleChangeIsRemember}
            label={t("isRemember")}
          />
          <AuthBottomLink
            href="/register"
            linkText={t("haveNotAccount.title")}
            text={t("haveNotAccount.text")}
          />
          <Button disabled={!!errors.email || !!errors.password} type="submit">
            {t("common:signIn")}
          </Button>
        </Wrapper>
      </Form>
    </MainWrapper>
  );
};

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 50px 20px;
  margin: 0 auto;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;

  & > button {
    margin: 20px auto 0;
  }

  & > label {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;
