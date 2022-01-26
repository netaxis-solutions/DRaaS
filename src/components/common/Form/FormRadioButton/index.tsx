import { FC, ChangeEvent, Ref, forwardRef } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from '@mui/material/RadioGroup';

import { RadioButtonType } from "utils/types/form";

import RadioButtonIcon from "./RadioButtonIcon";
import RadioButtonCheckedIcon from "./RadioButtonCheckedIcon";
import useStyles from "./styles";

export const RadioButton: FC<RadioButtonType> = ({
  onChange,
  disabled,
  checked,
  label = "",
  labelPlacement = "end",
  defaultValue = "0",
  value
}) => {
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<Element>, checked: boolean) => {
    onChange && onChange(e, checked);
  };

  return (
    <>
      <FormControlLabel
        control={
          <RadioGroup
          defaultValue={defaultValue}
          >
          <Radio
            className={classes.root}
            onChange={handleChange}
            checked={checked}
            value={value}
            icon={<RadioButtonIcon className={classes.root} />}
            checkedIcon={
              <RadioButtonCheckedIcon className={classes.iconChecked} />
            }
          />
          </RadioGroup>
        }
        label={label}
        disabled={disabled}
        labelPlacement={labelPlacement}
      />
    </>
  );
};

const FormRadioButton = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLInputElement>) => {
    console.log(props);
    
    return <RadioButton inputRef={ref} defaultValue="0"  value={props.index} checked={props.value} {...props} />;
  },
);

export default FormRadioButton;
