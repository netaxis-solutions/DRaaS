import { forwardRef, Ref, SyntheticEvent } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";

import useStyles from "./styles";

type TSelectProps = {
  options: Array<{ value: string; label: string }>;
  onChange: (value: { value: string; label: string } | null) => void;
  label: string;
  disabled?: boolean;
  helperText: string;
  className: string | undefined;
};

export const Select: React.FC<TSelectProps> = ({
  options,
  onChange,
  label,
  disabled,
  className,
}) => {
  const classes = useStyles();

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: { value: string; label: string } | null,
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
      }}
      className={className}
      renderInput={params => (
        <TextField
          variant="outlined"
          {...params}
          label={label}
          InputLabelProps={{
            classes: { outlined: classes.outlined, shrink: classes.shrink },
          }}
        />
      )}
    />
  );
};
const FormSelect = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLSelectElement>) => {
    return <Select checkboxRef={ref} {...props} />;
  },
);

export default FormSelect;
