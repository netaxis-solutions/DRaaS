import { forwardRef, Ref } from "react";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";
import { InputPropsType } from "utils/types/form";

const useTextFieldStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    "& svg": {
      width: 14,
      height: 14,
      fill: theme.palette.secondary.icon,
    },
  },
  adornedEnd:
    theme.direction === "ltr"
      ? {
          paddingRight: `${theme.spacing(2.5)}px`,
        }
      : { paddingLeft: `${theme.spacing(2.5)}px` },
  input: {
    padding: `${theme.spacing(1.75)}px ${theme.spacing(2.5)}px ${theme.spacing(
      1.25
    )}px`,
  },
  notchedOutline: {
    borderColor: theme.palette.input.border,
  },
}));

const useLabelStyles = makeStyles(() => ({
  shrink: {
    fontSize: "1rem",
  },
}));

export const Input: React.FC<InputPropsType> = ({
  onChange,
  icon: Icon,
  helperText,
  ...rest
}) => {
  const inputClasses = useTextFieldStyles();
  const labelClasses = useLabelStyles();
  const iconRender = Icon
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <Icon />
          </InputAdornment>
        ),
      }
    : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };
  const dataError = helperText ? { "data-error": helperText } : {};

  return (
    <TextField
      variant="outlined"
      onChange={handleChange}
      fullWidth
      InputProps={{ ...dataError, ...iconRender, classes: inputClasses }}
      InputLabelProps={{ classes: labelClasses }}
      {...rest}
    />
  );
};

const FormInput = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLInputElement>) => {
    const { error } = fieldState;

    return (
      <Input
        inputRef={ref}
        error={!!error}
        helperText={error?.message}
        {...props}
      />
    );
  }
);

export default FormInput;
