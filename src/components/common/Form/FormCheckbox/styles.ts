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
}));

export default useStyles;
