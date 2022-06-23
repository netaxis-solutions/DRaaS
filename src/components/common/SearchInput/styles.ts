import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    maxWidth: "100%",
    height: "100%",
    borderRadius: 0,
    border: "1px solid transparent",
    "& svg": {
      width: 14,
      height: 14,
      fill: theme.palette.icon.main,
    },
  },
  adornedStart:
    theme.direction === "ltr"
      ? {
          paddingRight: `${theme.spacing(2.5)}px`,
        }
      : { paddingLeft: `${theme.spacing(2.5)}px` },
  input: {
    padding: `${theme.spacing(2.25)}px ${theme.spacing(1)}px`,
    fontSize: "1.4rem",
  },
  notchedOutline: {
    borderColor: "transparent",
  },
}));

export default useStyles;
