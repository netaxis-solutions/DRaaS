import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    "&.Mui-disabled": {
      background: "#C0C0C0",
      color: theme.palette.primary.white,
      border: "none",
    },

    padding: `${theme.spacing(1.25)}px ${theme.spacing(2.5)}px`,
    "& svg": {
      width: 14,
      height: 14,
    },
  },
  startIcon: {
    marginTop: -theme.spacing(0.2),
  },
}));

export default useStyles;
