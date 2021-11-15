import { forwardRef, Ref, useState } from "react";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";
import { InputPropsType } from "utils/types/form";
import { EyeClosed, EyeOpened } from "components/Icons";

const useTextFieldStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    "& svg": {
      width: 14,
      height: 14,
      fill: theme.palette.icon.main
    }
  },
  adornedEnd:
    theme.direction === "ltr"
      ? {
          paddingRight: `${theme.spacing(2.5)}px`
        }
      : { paddingLeft: `${theme.spacing(2.5)}px` },
  input: {
    padding: `${theme.spacing(1.75)}px ${theme.spacing(2.5)}px ${theme.spacing(
      1.25
    )}px`,
    fontSize: "1.4rem"
  },
  notchedOutline: {
    borderColor: theme.palette.input.border
  }
}));

const useLabelStyles = makeStyles(() => ({
  outlined: {
    fontSize: "1.4rem"
  },
  shrink: {
    fontSize: "1rem"
  }
}));

const usePasswordIconStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: (props: { active: boolean }) => ({
    "&:hover": {
      backgroundColor: "transparent"
    },
    "& svg": {
      width: 19,
      height: 16,
      fill: props.active ? theme.palette.icon.active : theme.palette.icon.main,
      "&:hover": {
        fill: theme.palette.icon.hover
      },
      "&:active": {
        fill: theme.palette.icon.active
      }
    }
  })
}));

export const Input: React.FC<InputPropsType> = ({
  onChange,
  icon: Icon,
  helperText,
  type = "text",
  ...rest
}) => {
  const [isPwdVisible, setPwdVisibility] = useState(false);
  const inputClasses = useTextFieldStyles();
  const labelClasses = useLabelStyles();
  const passwordIconStyles = usePasswordIconStyles({ active: isPwdVisible });
  const isPasswordField = type === "password";
  const handlerClick = () => {
    setPwdVisibility(!isPwdVisible);
  };

  const passwordIcon = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          disableRipple
          onClick={handlerClick}
          classes={{ root: passwordIconStyles.root }}
        >
          {isPwdVisible ? <EyeOpened /> : <EyeClosed />}
        </IconButton>
      </InputAdornment>
    )
  };
  const icon = Icon
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <Icon />
          </InputAdornment>
        )
      }
    : null;

  const iconRender = isPasswordField ? passwordIcon : icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };
  const dataError = helperText ? { "data-error": helperText } : {};
  const typeOption = isPwdVisible && isPasswordField ? "text" : type;

  return (
    <TextField
      variant="outlined"
      onChange={handleChange}
      fullWidth
      InputProps={{ ...dataError, ...iconRender, classes: inputClasses }}
      InputLabelProps={{ classes: labelClasses }}
      type={typeOption}
      data-type={type}
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
