import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    "&.MuiCheckbox-colorSecondary.Mui-checked:hover": {
      background: "none",
    },
    "&:hover": {
      background: "none",
      "& svg": {
        stroke: theme.palette.primary.main,
      },
    },
  },
  iconChecked: { fill: theme.palette.primary.main },
  iconDisabled: {
    /*
      Need to align the icon to the same level as the inputs
    */
    marginLeft: theme.spacing(-0.2),
  },
  icon: {
    fill: "#FFFFFF",
    stroke: theme.palette.input.border,
  },

  disabled: {
    stroke: theme.palette.input.disabled,
  },

  label: {
    fontSize: "1.4rem",
  },

  helperText: {
    fontSize: "1.2rem",
    color: theme.palette.status.error,
  },
}));

export default useStyles;
