import { FocusEvent, Ref } from "react";

export type IconButtonPropsType = {
  title: string;
  type: "button" | "reset" | "submit" | undefined;
  icon: React.FC;
  variant?: "contained" | "outlined";
};

export type InputPropsType = {
  onChange: (value: object) => void;
  onBlur: (event?: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  icon?: React.FC;
  helperText?: string;
  label: string;
  name: string;
  value: string;
  error: boolean;
  inputRef: Ref<HTMLInputElement>;
};
