import { forwardRef, Ref, ChangeEvent } from "react";

import { FormControlLabel } from "@material-ui/core";
import MuiCheckbox from "@material-ui/core/Checkbox";
import { CheckboxType } from "utils/types/form";

import useStyles from "./styles";

export const Checkbox: React.FC<CheckboxType> = ({
  label = "",
  labelPlacement = "end",
  checked,
  onChange,
  disabled
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
      disabled={disabled}
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
