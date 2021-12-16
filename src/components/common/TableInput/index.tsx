import { forwardRef, Ref } from "react";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";
import { InputPropsType } from "utils/types/form";

const useTextFieldStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    maxWidth: theme.spacing(26.25),
    height: theme.spacing(4.25),
    backgroundColor: theme.palette.primary.white,
    "& svg": {
      width: 14,
      height: 14,
      fill: theme.palette.icon.main,
    },
  },
  adornedEnd:
    theme.direction === "ltr"
      ? {
          paddingRight: `${theme.spacing(2.5)}px`,
        }
      : { paddingLeft: `${theme.spacing(2.5)}px` },
  input: {
    padding: `0 ${theme.spacing(1.25)}px`,
    fontSize: "1.4rem",
  },
  notchedOutline: {
    padding: 0,
  },
  error: {
    marginRight: 0,
  },
}));

const useLabelStyles = makeStyles(() => ({
  outlined: {
    marginTop: -2,
    fontSize: "1.4rem",
  },
  shrink: {
    marginTop: -1,
    fontSize: "1.6rem",
  },
}));

export const TableInput: React.FC<InputPropsType> = ({
  onChange,
  icon: Icon,
  helperText,
  helper,
  type = "text",
  ...rest
}) => {
  const inputClasses = useTextFieldStyles();
  const labelClasses = useLabelStyles();

  const icon = Icon
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
    <>
      <TextField
        variant="outlined"
        onChange={handleChange}
        fullWidth
        InputProps={{ ...dataError, ...icon, classes: inputClasses }}
        InputLabelProps={{ classes: labelClasses }}
        type={type}
        data-type={type}
        {...rest}
      />
    </>
  );
};

const FormInput = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLInputElement>) => {
    const { error } = fieldState;

    return (
      <TableInput
        inputRef={ref}
        error={!!error}
        helperText={error?.message}
        {...props}
      />
    );
  },
);

export default FormInput;
