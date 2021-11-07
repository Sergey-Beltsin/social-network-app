import { FC } from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { AuthBottomLink, Button, Input } from "@/shared/ui/atoms";
import { registerModel } from "../model";

export const RegisterForm: FC = () => {
  const { useRegisterStore } = registerModel.store;
  const { handleChangeField, handleSubmit, handleBlur } = registerModel.events;
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
            onBlur={(value) => handleBlur({ field: "email", value })}
            error={errors.email ? t(`errors.${errors.email}`) : ""}
            label={t("email")}
            type="email"
            required
          />
          <Input
            value={store.name}
            onChange={(value) => handleChangeField({ field: "name", value })}
            onBlur={(value) => handleBlur({ field: "name", value })}
            error={errors.name ? t(`errors.${errors.name}`) : ""}
            label={t("name")}
            required
          />
          <Input
            value={store.surname}
            onChange={(value) => handleChangeField({ field: "surname", value })}
            onBlur={(value) => handleBlur({ field: "surname", value })}
            error={errors.surname ? t(`errors.${errors.surname}`) : ""}
            label={t("surname")}
            required
          />
          <Input
            value={store.username}
            onChange={(value) =>
              handleChangeField({ field: "username", value })
            }
            onBlur={(value) => handleBlur({ field: "username", value })}
            error={errors.username ? t(`errors.${errors.username}`) : ""}
            label={t("username")}
            required
          />
          <Input
            value={store.password}
            onChange={(value) =>
              handleChangeField({ field: "password", value })
            }
            onBlur={(value) => handleBlur({ field: "password", value })}
            error={errors.password ? t(`errors.${errors.password}`) : ""}
            label={t("password")}
            type="password"
            required
          />
          <Input
            value={store.repeatedPassword}
            onChange={(value) =>
              handleChangeField({ field: "repeatedPassword", value })
            }
            onBlur={(value) => handleBlur({ field: "repeatedPassword", value })}
            error={
              errors.repeatedPassword
                ? t(`errors.${errors.repeatedPassword}`)
                : ""
            }
            label={t("repeatPassword")}
            type="password"
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
            center
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
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;
