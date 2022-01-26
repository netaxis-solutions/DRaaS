import { FC, ChangeEvent, Ref, forwardRef } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { RadioButtonType } from "utils/types/form";

import RadioButtonIcon from "./RadioButtonIcon";
import RadioButtonCheckedIcon from "./RadioButtonCheckedIcon";
import useStyles from "./styles";
import { FormControl } from "@material-ui/core";

export const RadioButton: FC<RadioButtonType> = ({
  onChange,
  disabled,
  checked,
  label = "",
  labelPlacement = "end",
  value,
  defaultValue,
}) => {
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<Element>, checked: boolean) => {
    onChange && onChange(e, checked);
  };

  console.log(value, "VALUE",defaultValue, "DEFAULT VALUE");

  return (
    <>
      <FormControl>
        <RadioGroup defaultValue={defaultValue} >
          <FormControlLabel
              value={value}
              defaultValue={defaultValue}
            control={
              <Radio
                className={classes.root}
                onChange={handleChange}
                checked={checked}
                icon={<RadioButtonIcon className={classes.root} />}
                checkedIcon={
                  <RadioButtonCheckedIcon className={classes.iconChecked} />
                }
              />
            }
            label={label}
            disabled={disabled}
            labelPlacement={labelPlacement}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

const FormRadioButton = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLInputElement>) => {
    return (
      <RadioButton
        inputRef={ref}
        value={props.index}
        defaultValue={2}
        checked={props.value}
        {...props}
      />
    );
  },
);

export default FormRadioButton;
