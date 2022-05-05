import { forwardRef, Ref, ChangeEvent } from "react";
import clsx from "clsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiCheckbox from "@material-ui/core/Checkbox";
import { Row } from "react-table";

import { CheckboxType } from "utils/types/form";
import { TableData } from "utils/types/tableConfig";

import CheckboxIcon from "components/common/Form/FormCheckbox/CheckboxIcon";
import CheckboxCheckedIcon from "components/common/Form/FormCheckbox/CheckboxCheckedIcon";
import useStyles from "./styles";

export const Checkbox: React.FC<
  CheckboxType & {
    row?: Row<TableData>;
    isAvailable?: (row: Row<TableData>) => boolean;
  }
> = ({
  label = "",
  labelPlacement = "end",
  onChange,
  disabled,
  checked,
  helperText,
  isAvailable,
  row,
}) => {
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<Element>, checked: boolean) => {
    onChange(e, checked);
  };
  const isRowDisabled = (isAvailable && row && !isAvailable(row)) || disabled;
  return (
    <>
      <FormControlLabel
        control={
          <MuiCheckbox
            onChange={handleChange}
            classes={{ root: classes.root }}
            checked={checked}
            icon={
              <CheckboxIcon
                className={clsx(classes.icon, {
                  [classes.disabled]: isRowDisabled,
                })}
              />
            }
            checkedIcon={
              <CheckboxCheckedIcon className={classes.iconChecked} />
            }
          />
        }
        label={label}
        classes={{ label: classes.label }}
        labelPlacement={labelPlacement}
        disabled={isRowDisabled}
      />
      {helperText && <span>{helperText}</span>}
    </>
  );
};

const FormCheckbox = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLInputElement>) => {
    const { error } = fieldState;

    return (
      <Checkbox
        checkboxRef={ref}
        helperText={error?.message}
        error={!!error}
        checked={props.value}
        {...props}
      />
    );
  },
);

export default FormCheckbox;
