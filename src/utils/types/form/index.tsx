export type ButtonPropsType = {
  title: string;
  type: "button" | "reset" | "submit" | undefined;
};

export type InputPropsType = {
  onChange?: (value: object) => void;
  icon?: React.FC;
  helperText?: string;
  label: string;
};
