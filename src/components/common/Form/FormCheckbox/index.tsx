import { forwardRef, Ref, ChangeEvent } from "react";
import clsx from "clsx";

import { FormControlLabel } from "@material-ui/core";
import MuiCheckbox from "@material-ui/core/Checkbox";
import { CheckboxType } from "utils/types/form";

import useStyles from "./styles";
import CheckboxIcon from "levels/authorization/Login/components/CheckboxIcon";
import CheckboxCheckedIcon from "levels/authorization/Login/components/CheckboxCheckedIcon";

export const Checkbox: React.FC<CheckboxType> = ({
  label = "",
  labelPlacement = "end",
  onChange,
  disabled,
  ...rest
}) => {
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<Element>, checked: boolean) => {
    onChange(e, checked);
  };
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          onChange={handleChange}
          classes={{ root: classes.root }}
          {...rest}
          icon={
            <CheckboxIcon
              className={clsx(classes.icon, {
                [classes.disabled]: disabled,
              })}
            />
          }
          checkedIcon={<CheckboxCheckedIcon />}
          size={"small"}
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
      <Checkbox
        checkboxRef={ref}
        helperText={error?.message}
        checked={props.value}
        {...props}
      />
    );
  },
);

export default FormCheckbox;
