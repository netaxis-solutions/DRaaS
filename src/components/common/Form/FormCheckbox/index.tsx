import { forwardRef, Ref } from "react";

import { FormControlLabel } from "@material-ui/core";
import MuiCheckbox from "@material-ui/core/Checkbox";
import { ChangeEvent } from "react";

import useStyles from "./styles";

type CheckboxType = {
  onChange: (e: ChangeEvent<Element>, checked: boolean) => void;
  checked: boolean;
  label?: string;
  labelPlacement?: "end" | "bottom" | "top" | "start";
  checkboxRef?: Ref<HTMLInputElement>;
};

export const Checkbox: React.FC<CheckboxType> = ({
  label = "",
  labelPlacement = "end",
  checked,
  onChange
}) => {
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<Element>, checked: boolean) => {
    onChange(e, checked);
  };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          classes={{ root: classes.root }}
          checked={checked}
          onChange={handleChange}
        />
      }
      label={label}
      classes={{ label: classes.label }}
      labelPlacement={labelPlacement}
    />
  );
};

const FormCheckbox = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLInputElement>) => {
    const { error } = fieldState;

    return (
      <Checkbox checkboxRef={ref} helperText={error?.message} {...props} />
    );
  }
);

export default FormCheckbox;
