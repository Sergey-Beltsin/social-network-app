/* eslint-disable react/jsx-props-no-spreading */
import { FC, useMemo, useState } from "react";
import styled from "styled-components";
import { UseFormRegisterReturn } from "react-hook-form";
import debounce from "lodash.debounce";

import { EyeIcon, EyeOffIcon } from "@/shared/lib/icons/auth";
import { ErrorText } from "@/shared/ui/atoms";

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string | boolean;
  type?: "text" | "password" | "email";
  autocomplete?: boolean;
  handleRegister?: () => UseFormRegisterReturn;
  textarea?: boolean;
  onDebounce?: () => void;
  stretch?: boolean;
};

type ContainerProps = {
  isError: boolean;
  isEmpty: boolean;
  isTextarea: boolean;
  isStretch: boolean;
};

export const Input: FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  onBlur,
  required,
  error,
  type = "text",
  autocomplete = false,
  handleRegister,
  textarea,
  onDebounce,
  stretch,
}) => {
  const [isPasswordType, setIsPasswordType] = useState<boolean>(
    type === "password",
  );

  const handleChangePasswordType = () => {
    setIsPasswordType((prevState) => !prevState);
  };

  const getType = (): "text" | "password" | "email" => {
    if (type === "password") {
      return "text";
    }

    return type;
  };

  const handleGetRegister = () => {
    if (handleRegister) {
      return handleRegister();
    }

    return {};
  };

  const getTypeWithTextarea = () => {
    if (textarea) {
      return undefined;
    }
    if (isPasswordType) {
      return "password";
    }

    return getType();
  };

  const handleChange = (currentValue: string) => {
    if (onChange) {
      debouncedChangeHandler();
      onChange(currentValue);
    }
  };

  const debounceChange = () => {
    if (onDebounce) {
      onDebounce();
    }
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(debounceChange, 500),
    [],
  );

  return (
    <Container
      isError={!!error}
      isEmpty={!value}
      isTextarea={!!textarea}
      isStretch={!!stretch}
    >
      <InputWrapper>
        {/* @ts-ignore */}
        <StyledInput
          type={getTypeWithTextarea()}
          value={value}
          onChange={({ target }) => handleChange(target.value)}
          onBlur={() => onBlur && onBlur(value || "")}
          required={required}
          autoComplete={autocomplete ? "on" : "new-password"}
          as={textarea ? "textarea" : "input"}
          placeholder={placeholder}
          {...handleGetRegister()}
        />
        {type === "password" && (
          <IconWrapper type="button" onClick={handleChangePasswordType}>
            {isPasswordType ? <EyeOffIcon /> : <EyeIcon />}
          </IconWrapper>
        )}
        <Label>{label}</Label>
        <Bar />
      </InputWrapper>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

const Container = styled.label<ContainerProps>`
  display: block;

  position: relative;

  width: 100%;
  max-width: ${({ isStretch }) => (isStretch ? "none" : "400px")};

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    &:not(:last-of-type) {
      margin-bottom: 30px;
    }
  }

  ${({ isError, isEmpty, theme }) =>
    isError &&
    `
    & ${Label} {
      opacity: 1;

      color: ${theme.colors.red} !important;
      ${
        !isEmpty &&
        `
        top: -14px;
        font-size: 14px;
      `
      }
    }

    & ${Bar} {
      background-color: ${theme.colors.red};
    }
  `}

  ${({ isTextarea }) =>
    isTextarea &&
    `
    & ${Label} {
      top: 6px;
    }

    & ${StyledInput} {
      height: 60px;
      
      &:focus,
      &:valid {
        & ~ ${Label} {
          top: -18px !important;
        } 
      }
    }
  `}
`;

const InputWrapper = styled.div`
  display: flex;

  position: relative;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Label = styled.span`
  position: absolute;
  top: 18px;
  left: 10px;

  pointer-events: none;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;

  transition: 0.2s ease-in-out;

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    top: 14px;

    font-size: 18px;
  }
`;

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;

  height: 2px;

  background-color: ${({ theme }) => theme.colors.primary};
  transform: scaleX(0);

  transition: 0.2s ease-in-out;
`;

const StyledInput = styled.input`
  width: calc(100% - 20px);
  height: 40px;
  min-height: 40px;
  padding: 0 10px;

  background-color: transparent;
  border: none;
  outline: none;
  resize: vertical;

  color: ${({ theme }) => theme.colors.text.primary};
  font-family: sans-serif;
  font-size: 12px;

  &:focus,
  &:valid {
    & ~ ${Label} {
      top: -4px;

      opacity: 1;

      color: ${({ theme }) => theme.colors.primary};
      font-size: 10px;

      @media (min-width: ${({ theme }) => theme.devices.tablet}) {
        top: -14px;

        font-size: 14px;
      }
    }

    & ~ ${Bar} {
      transform: scaleX(1);
    }
  }

  @media (min-width: ${({ theme }) => theme.devices.tablet}) {
    font-size: 16px;
  }
`;

const IconWrapper = styled.button`
  padding: 0;

  background-color: transparent;
  border: none;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
  }
`;
