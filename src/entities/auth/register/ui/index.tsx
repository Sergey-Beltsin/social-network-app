import { FC, useEffect } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";

import {
  AuthBottomLink,
  Button,
  ErrorText,
  Input,
  Title,
} from "@/shared/ui/atoms";
import { registerModel } from "../model";
import { RegisterFormType } from "../model/model.types";
import { validationScheme } from "@/shared/lib/constants";

export const RegisterForm: FC = () => {
  const { useRegisterStore } = registerModel.store;
  const { handleSubmit, handleChangeError, handleReset } = registerModel.events;
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit: handleFormSubmit,
    watch,
  } = useForm<RegisterFormType>({
    mode: "onBlur",
  });

  const store = useRegisterStore();
  const { isLoading, error } = store;
  const { t } = useTranslation("auth");

  watch((_, { name }) => {
    if (error && (name === "email" || name === "username")) {
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
      <HiddenTitle className="visually-hidden">
        {t("regHiddenTitle")}
      </HiddenTitle>
      <Form onSubmit={handleFormSubmit((data) => handleSubmit(data))}>
        <Wrapper>
          <Title center>{t("regTitle")}</Title>
          <Input
            error={
              errors.email
                ? t(`errors:errors.${errors.email.type}`)
                : !!error || ""
            }
            label={t("email")}
            required
            handleRegister={() =>
              register("email", {
                required: true,
                pattern: validationScheme.email.pattern,
              })
            }
          />
          <Input
            error={
              errors.name
                ? t(`errors:errors.${errors.name.type}`, {
                    count:
                      errors.name.type === "minLength"
                        ? validationScheme.name.minLength || ""
                        : validationScheme.name.maxLength || "",
                  })
                : ""
            }
            label={t("name")}
            required
            handleRegister={() =>
              register("name", {
                required: true,
                minLength: validationScheme.name.minLength,
                maxLength: validationScheme.name.maxLength,
              })
            }
          />
          <Input
            error={
              errors.surname
                ? t(`errors:errors.${errors.surname.type}`, {
                    count:
                      errors.surname.type === "minLength"
                        ? validationScheme.surname.minLength || ""
                        : validationScheme.surname.maxLength || "",
                  })
                : ""
            }
            label={t("surname")}
            required
            handleRegister={() =>
              register("surname", {
                required: true,
                minLength: validationScheme.surname.minLength,
                maxLength: validationScheme.surname.maxLength,
              })
            }
          />
          <Input
            error={
              errors.username
                ? t(`errors:errors.${errors.username.type}`, {
                    count:
                      errors.username.type === "minLength"
                        ? validationScheme.username.minLength || ""
                        : validationScheme.username.maxLength || "",
                  })
                : !!error || ""
            }
            label={t("username")}
            required
            handleRegister={() =>
              register("username", {
                required: true,
                minLength: validationScheme.username.minLength,
                maxLength: validationScheme.username.maxLength,
              })
            }
          />
          <Input
            error={
              errors.password
                ? t("errors:errors.passwordPattern", {
                    count:
                      errors.password.type === "minLength"
                        ? validationScheme.password.minLength || ""
                        : validationScheme.password.maxLength || "",
                  })
                : ""
            }
            label={t("password")}
            type="password"
            required
            handleRegister={() =>
              register("password", {
                required: true,
                // minLength: validationScheme.password.minLength,
                // maxLength: validationScheme.password.maxLength,
                pattern: validationScheme.password.pattern,
              })
            }
          />
          <Input
            error={
              errors.repeatPassword
                ? t(`errors:errors.${errors.repeatPassword.message}`)
                : ""
            }
            label={t("repeatPassword")}
            type="password"
            required
            handleRegister={() =>
              register("repeatPassword", {
                validate: (value) => {
                  if (value !== getValues("password")) {
                    return "passwordMismatch";
                  }

                  return true;
                },
              })
            }
          />
          <ErrorTextWrapper>
            {error && <ErrorText>{t(`errors:errors.${error}`)}</ErrorText>}
          </ErrorTextWrapper>
          <AuthBottomLink
            href="/login"
            linkText={t("haveAccount.title")}
            text={t("haveAccount.text")}
          />
          <Button
            disabled={!!Object.values(errors).length || !!error}
            type="submit"
            center
            loading={isLoading}
          >
            {t("common:signUp")}
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

const ErrorTextWrapper = styled.span`
  display: block;

  margin-top: 8px;
  margin-bottom: 30px;
`;

const HiddenTitle = styled.h1``;
