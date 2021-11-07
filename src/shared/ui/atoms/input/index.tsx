import { FC, useState } from "react";
import styled from "styled-components";
import { EyeIcon, EyeOffIcon } from "@/shared/lib/icons/auth";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  label: string;
  required?: boolean;
  error?: string;
  type?: "text" | "password" | "email";
  autocomplete?: boolean;
};

type ContainerProps = {
  isError?: boolean;
};

export const Input: FC<InputProps> = ({
  value,
  onChange,
  label,
  onBlur,
  required,
  error,
  type = "text",
  autocomplete = false,
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

  return (
    <Container isError={!!error}>
      <InputWrapper>
        <StyledInput
          type={isPasswordType ? "password" : getType()}
          value={value}
          onChange={({ target }) => onChange(target.value)}
          onBlur={() => onBlur && onBlur(value)}
          required={required}
          autoComplete={autocomplete ? "on" : "new-password"}
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

  max-width: 400px;

  &:not(:last-of-type) {
    margin-bottom: 30px;
  }

  ${({ isError, theme }) =>
    isError &&
    `
    & ${Label} {
      color: ${theme.colors.red} !important;
    }
    
    & ${Bar} {
      background-color: ${theme.colors.red};
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
  top: 14px;
  left: 10px;

  pointer-events: none;

  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 18px;

  transition: 0.2s ease-in-out;
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

const ErrorText = styled.span`
  display: block;

  margin-top: 4px;
  margin-left: 10px;

  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
`;

const StyledInput = styled.input`
  width: calc(100% - 20px);
  height: 40px;
  padding: 0 10px;

  background-color: transparent;
  border: none;
  outline: none;

  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;

  &:focus,
  &:valid {
    & ~ ${Label} {
      top: -14px;

      opacity: 1;

      color: ${({ theme }) => theme.colors.primary};
      font-size: 14px;
    }

    & ~ ${Bar} {
      transform: scaleX(1);
    }
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
