import { forwardRef, Ref } from "react";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core";

const useFormHelperStyles = makeStyles((theme) => ({
  contained: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(2.5)}px !important`,
    fontSize: "1.2rem",
  },
}));

const useTextFieldStyles = makeStyles((theme) => ({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  const iconRender = Icon
    ? {
        endAdornment: <InputAdornment position="end">Icon</InputAdornment>,
      }
    : undefined;

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
