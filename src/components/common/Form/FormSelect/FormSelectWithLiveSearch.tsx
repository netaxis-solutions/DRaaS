import { forwardRef, Ref, SyntheticEvent } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import clsx from "clsx";

import FormSelectWithLiveSearchStorage from "storage/singletons/FormSelectWithLiveSearch";
import { TSelectProps } from "utils/types/form";
import useStyles from "./styles";

export const Select: React.FC<TSelectProps> = ({
  options,
  onChange,
  onSearch,
  label,
  disabled,
  className,
  helperText,
}) => {
  const classes = useStyles();

  const { setNewValue: setValue } = FormSelectWithLiveSearchStorage;

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: { value: string; label: string } | null,
  ) => {
    onChange(value);
  };

  const onChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSearch && onSearch({ label: newValue, value: newValue }, setValue);
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
      className={className}
      clearOnBlur={false}
      clearOnEscape={false}
      value={FormSelectWithLiveSearchStorage.currentValue}
      renderInput={params => (
        <>
          <TextField
            variant="outlined"
            {...params}
            onChange={onChangeTextField}
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
const FormSelectWithLiveSearch = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLSelectElement>) => {
    const { error } = fieldState;
    const errorMessage = error?.value?.message;

    return <Select inputRef={ref} helperText={errorMessage} {...props} />;
  },
);

export default FormSelectWithLiveSearch;
