import { forwardRef, Ref } from "react";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useFormHelperStyles = makeStyles((theme) => ({
  contained: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(2.5)}px !important`,
    fontSize: "1.2rem",
  },
}));

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
    fontSize: "1.4rem",
  },
  notchedOutline: {
    borderColor: theme.palette.input.border,
  },
}));

const useLabelStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    "&$disabled": {
      color: `${theme.palette.secondary.text} !important`,
    },
  },
}));

export const Input = ({
  onChange,
  icon: Icon,
  ...rest
}: {
  onChange?: (value: object) => void;
  [key: string]: any;
}) => {
  const helperClasses = useFormHelperStyles();
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
    : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <TextField
      variant="outlined"
      onChange={handleChange}
      fullWidth={true}
      FormHelperTextProps={{ classes: helperClasses }}
      InputProps={{
        ...iconRender,
        classes: inputClasses,
      }}
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
