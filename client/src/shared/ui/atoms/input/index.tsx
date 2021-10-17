import { FC } from "react";
import styled from "styled-components";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  label: string;
  required?: boolean;
  error?: string;
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
}) => (
  <Container isError={!!error}>
    <InputWrapper>
      <StyledInput
        type="text"
        value={value}
        onChange={({ target }) => onChange(target.value)}
        onBlur={() => onBlur && onBlur(value)}
        required={required}
      />
      <Label>{label}</Label>
      <Bar />
    </InputWrapper>

    {error && <ErrorText>{error}</ErrorText>}
  </Container>
);

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
  position: relative;
`;

const Label = styled.span`
  position: absolute;
  top: 14px;
  left: 10px;

  pointer-events: none;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 18px;

  transition: 0.2s ease-in-out;
`;

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;

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
