import { FC } from "react";
import styled from "styled-components";

import { actions, store } from "../model";
import { Input } from "@/shared/ui/atoms";

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

  return (
    <Form>
      <Input
        value={email}
        onChange={handleChangeEmail}
        label="Email"
        onBlur={handleBlurEmail}
        required
      />
      <Input
        value={password}
        onChange={handleChangePassword}
        label="Password"
        onBlur={handleBlurPassword}
        required
      />
    </Form>
  );
};

const Form = styled.form``;
