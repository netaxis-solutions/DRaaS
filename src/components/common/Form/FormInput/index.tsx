import { forwardRef, Ref } from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";

const useFormHelperStyles = makeStyles((theme) => ({
  contained: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(2.5)}px !important`,
    fontSize: "1.2rem",
  },
}));

export const Input = ({
  onChange,
  ...rest
}: {
  onChange?: (value: object) => void;
  [key: string]: any;
}) => {
  const helperStyles = useFormHelperStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <TextField
      variant="outlined"
      onChange={handleChange}
      fullWidth={true}
      FormHelperTextProps={{ classes: helperStyles }}
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
