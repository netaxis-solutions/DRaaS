import React, { ChangeEvent, FocusEvent, Ref } from "react";

export type IconWithButtonPropsType = {
  title: string;
  type?: "button" | "reset" | "submit" | undefined;
  icon?: React.FC;
  variant?: "contained" | "outlined";
  onClick?: () => void;
  className?: string | undefined;
  form?: string;
  cancel?: boolean;
};

export type IconButtonPropsType = {
  disableRipple: boolean;
  icon: React.FC;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  labelShrink?: boolean;
  InputProps?: { [key: string]: any };
};

export type SearchInputType = {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export type CheckboxType = {
  label?: string;
  labelPlacement?: "end" | "bottom" | "top" | "start";
  checkboxRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
  onChange: (e: ChangeEvent<Element>, checked: boolean) => void;
  checked: boolean;
  helperText?: string;
  helper?: string;
};

export type RadioButtonType = {
  label?: string;
  labelPlacement?: "end" | "bottom" | "top" | "start";
  checkboxRef?: Ref<HTMLInputElement>;
  disabled?: boolean;
  onChange: (e: ChangeEvent<Element>, checked: boolean) => void;
  checked: boolean;
};

export type OptionValue = {
  label: string;
  value: string;
};

export type TSelectProps = {
  options: Array<{ value: string; label: string; image?: JSX.Element }>;
  onChange: (
    value: OptionValue | null,
    setValue?: (optionValue: OptionValue | string) => void,
  ) => void;
  onSearch?: (
    value: OptionValue,
    setValue?: (optionValue: string) => void,
  ) => void;
  label: string;
  disabled?: boolean;
  helperText: string;
  className: string | undefined;
};
