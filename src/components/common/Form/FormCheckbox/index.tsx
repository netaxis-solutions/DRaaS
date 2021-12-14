import { forwardRef, Ref, ChangeEvent } from "react";
import clsx from "clsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiCheckbox from "@material-ui/core/Checkbox";

import { CheckboxType } from "utils/types/form";

import CheckboxIcon from "components/common/Form/FormCheckbox/CheckboxIcon";
import CheckboxCheckedIcon from "components/common/Form/FormCheckbox/CheckboxCheckedIcon";
import useStyles from "./styles";

export const Checkbox: React.FC<CheckboxType> = ({
  label = "",
  labelPlacement = "end",
  onChange,
  disabled,
  checked,
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
          checked={checked}
          icon={
            <CheckboxIcon
              className={clsx(classes.icon, {
                [classes.disabled]: disabled,
              })}
            />
          }
          checkedIcon={<CheckboxCheckedIcon className={classes.iconChecked} />}
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
