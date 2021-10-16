import { FC } from "react";
import styled from "styled-components";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  label: string;
  required?: boolean;
};

export const Input: FC<InputProps> = ({
  value,
  onChange,
  label,
  onBlur,
  required,
}) => (
  <Container>
    <StyledInput
      type="text"
      value={value}
      onChange={({ target }) => onChange(target.value)}
      onBlur={() => onBlur && onBlur(value)}
      required={required}
    />
    <Label>{label}</Label>
    <Bar />
  </Container>
);

const Container = styled.label`
  display: block;

  position: relative;
`;

const Label = styled.span`
  position: absolute;
  top: 14px;
  left: 0;

  opacity: 0.5;
  pointer-events: none;

  font-size: 18px;

  transition: 0.2s ease-in-out;
`;

const Bar = styled.div``;

const StyledInput = styled.input`
  width: calc(100% - 20px);
  height: 40px;
  padding: 0 10px;

  background-color: transparent;
  border: none;
  outline: none;

  font-size: 16px;

  &:focus,
  &:valid {
    & ~ ${Label} {
      top: -20px;

      opacity: 1;

      font-size: 14px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
