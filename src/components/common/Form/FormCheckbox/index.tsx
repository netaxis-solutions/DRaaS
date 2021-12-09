import { forwardRef, Ref, ChangeEvent } from "react";

import { FormControlLabel } from "@material-ui/core";
import MuiCheckbox from "@material-ui/core/Checkbox";
import { CheckboxType, TCheckboxProps } from "utils/types/form";

import useStyles from "./styles";
import { CheckboxWithWhiteCheck } from "components/Icons";

export const Checkbox: React.FC<CheckboxType> = ({
  label = "",
  labelPlacement = "end",
  onChange,
  disabled,
  checkedIcon,
  ...rest
}) => {
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<Element>, checked: boolean) => {
    onChange(e, checked);
  };
  const props: TCheckboxProps = {
    onChange: handleChange,
    ...rest,
  };
  checkedIcon && (props.checkedIcon = <CheckboxWithWhiteCheck />);

  return (
    <FormControlLabel
      control={<MuiCheckbox {...props} classes={{ root: classes.root }} />}
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
