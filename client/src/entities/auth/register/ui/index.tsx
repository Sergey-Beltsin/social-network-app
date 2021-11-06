import { FC } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { AuthBottomLink, Button, Input } from "@/shared/ui/atoms";
import { registerModel } from "../model";

export const RegisterForm: FC = () => {
  const { useRegisterStore } = registerModel.store;
  const { handleChangeField, handleSubmit } = registerModel.events;
  const store = useRegisterStore();
  const { errors } = store;
  const { t } = useTranslation("auth");

  return (
    <MainWrapper>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Input
            value={store.email}
            onChange={(value) => handleChangeField({ field: "email", value })}
            label={t("email")}
            error={errors.email ? t(errors.email) : ""}
            required
          />
          <Input
            value={store.name}
            onChange={(value) => handleChangeField({ field: "name", value })}
            error={errors.name ? t(errors.name) : ""}
            label={t("name")}
            required
          />
          <Input
            value={store.surname}
            onChange={(value) => handleChangeField({ field: "surname", value })}
            error={errors.surname ? t(errors.surname) : ""}
            label={t("surname")}
            required
          />
          <Input
            value={store.username}
            onChange={(value) =>
              handleChangeField({ field: "username", value })
            }
            error={errors.username ? t(errors.username) : ""}
            label={t("username")}
            required
          />
          <Input
            value={store.password}
            onChange={(value) =>
              handleChangeField({ field: "password", value })
            }
            error={errors.password ? t(errors.password) : ""}
            label={t("password")}
            required
          />
          <AuthBottomLink
            href="/login"
            linkText={t("haveAccount.title")}
            text={t("haveAccount.text")}
          />
          <Button
            disabled={!!Object.values(errors).find((error) => error)}
            type="submit"
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
