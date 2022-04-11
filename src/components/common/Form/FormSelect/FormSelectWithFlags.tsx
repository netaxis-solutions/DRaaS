import { forwardRef, Ref, SyntheticEvent, useState } from "react";
import { Box, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import clsx from "clsx";

import { TSelectProps } from "utils/types/form";

import Flag from "components/common/Flag";

import useStyles from "./styles";

export const Select: React.FC<TSelectProps> = ({
  options,
  onChange,
  label,
  disabled,
  className,
  helperText,
}) => {
  const [currentFlag, setFlag] = useState("");
  const classes = useStyles();

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    value: { value: string; label: string } | null,
  ) => {
    onChange(value);
    setFlag(value?.value || "");
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
        option: classes.optionWithFlags,
        popupIndicator: classes.popupIndicator,
        groupLabel: classes.groupLabel,
      }}
      className={className}
      renderInput={params => {
        return (
          <>
            <TextField
              variant="outlined"
              {...params}
              label={label}
              InputProps={{
                error: !!helperText,
                ...params.InputProps,
                startAdornment: currentFlag && (
                  <div className={classes.startAdornment}>
                    <Flag countryCode={currentFlag} />
                  </div>
                ),
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
        );
      }}
      renderOption={(props, option) => (
        <Box {...props}>
          {
            <>
              {option.image} {option.label}
            </>
          }
        </Box>
      )}
    />
  );
};
const FormSelectWithFlags = forwardRef(
  ({ fieldState, formState, ...props }: any, ref: Ref<HTMLSelectElement>) => {
    const { error } = fieldState;
    const errorMessage = error?.message;
    return <Select inputRef={ref} helperText={errorMessage} {...props} />;
  },
);

export default FormSelectWithFlags;
