import { FC, useEffect } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

import { loginModel } from "../model";
import {
  AuthBottomLink,
  Button,
  Checkbox,
  ErrorText,
  Input,
} from "@/shared/ui/atoms";
import { LoginFormType } from "../model/model.types";
import { validationScheme } from "@/shared/lib/constants";

export const LoginForm: FC = () => {
  const { useLoginStore } = loginModel.store;
  const {
    handleChangeIsRemember,
    handleSubmit,
    handleChangeError,
    handleReset,
  } = loginModel.actions;
  const { isRemember, isLoading, error } = useLoginStore();
  const {
    register,
    formState: { errors },
    handleSubmit: handleFormSubmit,
    watch,
  } = useForm<LoginFormType>({
    mode: "onBlur",
  });
  const { t } = useTranslation("auth");

  watch(() => {
    if (error) {
      handleChangeError("");
    }
  });

  useEffect(
    () => () => {
      handleReset();
    },
    [],
  );

  return (
    <MainWrapper>
      <Form onSubmit={handleFormSubmit((data) => handleSubmit(data))}>
        <Wrapper>
          <Input
            label={t("email")}
            error={
              errors.email
                ? t(`errors:errors.${errors.email.type}`)
                : !!error || ""
            }
            autocomplete
            required
            handleRegister={() =>
              register("email", {
                required: true,
                pattern: validationScheme.email.pattern,
              })
            }
          />
          <Input
            label={t("password")}
            error={
              errors.password
                ? t(`errors:errors.${errors.password.type}`, {
                    count:
                      errors.password.type === "minLength"
                        ? validationScheme.password.minLength || ""
                        : validationScheme.password.maxLength || "",
                  })
                : !!error || ""
            }
            type="password"
            autocomplete
            required
            handleRegister={() =>
              register("password", {
                required: true,
                minLength: validationScheme.password.minLength,
                maxLength: validationScheme.password.maxLength,
              })
            }
          />
          <ErrorTextWrapper>
            {error && <ErrorText>{t(`errors:errors.${error}`)}</ErrorText>}
          </ErrorTextWrapper>
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
          <Button
            disabled={!!Object.keys(errors).length || !!error}
            type="submit"
            center
            loading={isLoading}
          >
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
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;

  & > label {
    &:nth-child(2) {
      margin-bottom: 0;
    }
  }
`;

const ErrorTextWrapper = styled.span`
  display: block;

  margin-top: 8px;
  margin-bottom: 30px;
`;
