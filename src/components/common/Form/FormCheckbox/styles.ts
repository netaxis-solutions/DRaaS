import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
    // transform: "scale(1.422)",
  },

  icon: {
    fill: "#FFFFFF",
    stroke: "#B4BDC2",
  },

  disabled: {
    stroke: "#D9DDE0",
  },

  label: {
    fontSize: "1.4rem",
  },
}));

export default useStyles;
