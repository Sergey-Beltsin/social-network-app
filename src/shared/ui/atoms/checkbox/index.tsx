import { FC } from "react";
import styled from "styled-components";

import { CheckIcon } from "@/shared/lib/icons/common";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <Label>
    <Input
      className="visually-hidden"
      type="checkbox"
      checked={checked}
      onChange={() => onChange(!checked)}
    />
    <CustomCheckbox>
      <CheckIcon />
    </CustomCheckbox>
    <Text>{label}</Text>
  </Label>
);

const Label = styled.label`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const CustomCheckbox = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 20px;
  margin-right: 10px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;

  transition: 0.2s ease-in-out;

  & > svg {
    width: 16px;
    height: 16px;

    transform: translateY(-50px);
    stroke: ${({ theme }) => theme.colors.primary};

    transition: 0.2s ease-in-out;
  }
`;

const Text = styled.span`
  font-size: 14px;
`;

const Input = styled.input`
  &:checked ~ ${CustomCheckbox} {
    border-color: ${({ theme }) => theme.colors.borderSecondary};

    & > svg {
      transform: translateY(0);
    }
  }
`;
