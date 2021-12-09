import React, { ChangeEvent, FocusEvent, Ref } from "react";

export type IconWithButtonPropsType = {
  title: string;
  type?: "button" | "reset" | "submit" | undefined;
  icon: React.FC;
  variant?: "contained" | "outlined";
  onClick?: () => void;
  className?: string | undefined;
};

export type IconButtonPropsType = {
  disableRipple: boolean;
  icon: React.FC;
  onClick?: () => void;
};

export type InputPropsType = {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event?: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  icon?: React.FC;
  helperText?: string;
  label?: string;
  name?: string;
  value: string;
  error?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  type?: string;
  helper?: string;
};

export type SearchInputType = {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};
export type TCheckboxProps = {
  onChange: (e: ChangeEvent<Element>, checked: boolean) => void;
  checked: boolean;
  checkedIcon?: React.ReactNode;
};
export type CheckboxType = TCheckboxProps & {
  label?: string;
  labelPlacement?: "end" | "bottom" | "top" | "start";
  checkboxRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
};

export type TSelectProps = {
  options: Array<{ value: string; label: string }>;
  onChange: (value: { value: string; label: string } | null) => void;
  label: string;
  disabled?: boolean;
  helperText: string;
  className: string | undefined;
};
