import { forwardRef, Ref, SyntheticEvent } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import clsx from "clsx";

import { TSelectProps } from "utils/types/form";
import useStyles from "./styles";

export const Select: React.FC<TSelectProps> = ({
  options,
  onChange,
  label,
  disabled,
  className,
  helperText,
}) => {
  const classes = useStyles();

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: { value: string; label: string; groupBy: string } | null,
  ) => {
    onChange(value);
  };
  return (
    <Autocomplete
      options={options}
      onChange={handleChange}
      disabled={disabled}
      classes={{
        root: classes.autocompleteRoot,
        inputRoot: classes.automcompleteInputRoot,
        input: classes.autocompleteInput,
        endAdornment: classes.endAdornment,
        option: classes.option,
        popupIndicator: classes.popupIndicator,
        groupLabel: classes.groupLabel,
      }}
      groupBy={option => option.groupBy}
      className={className}
      renderInput={params => (
        <>
          <TextField
            variant="outlined"
            {...params}
            label={label}
            InputProps={{
              error: !!helperText,
              ...params.InputProps,
            }}
            InputLabelProps={{
              classes: {
                outlined: clsx(classes.outlined, {
                  [classes.error]: !!helperText,
                }),
                shrink: clsx(classes.shrink, {
                  [classes.error]: !!helperText,
                }),
              },
            }}
          />
          {helperText && (
            <span className={classes.errorHelperText}>{helperText}</span>
          )}
        </>
      )}
    />
  );
};
const FormSelect = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLSelectElement>) => {
    const { error } = fieldState;
    const errorMessage = error?.value?.message;

    return <Select inputRef={ref} helperText={errorMessage} {...props} />;
  },
);

export default FormSelect;
