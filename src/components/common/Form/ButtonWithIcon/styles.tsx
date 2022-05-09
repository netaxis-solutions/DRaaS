import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    "&.Mui-disabled": {
      background: theme.body.button.disabled.background,
      color: theme.body.button.disabled.text,
      border: theme.body.button.disabled.border,
    },

    background: theme.body.button.normal.background,
    color: theme.body.button.normal.text,
    border: theme.body.button.normal.border,

    "&:hover": {
      color: theme.body.button.action.hover.text,
      border: theme.body.button.action.border,
      "& svg": {
        "& path": {
          fill: theme.body.button.action.hover.text,
        },
      },
    },

    padding: `${theme.spacing(1.25)}px ${theme.spacing(2.5)}px`,
    "& svg": {
      width: 14,
      height: 14,
      "& path": {
        fill: theme.body.button.disabled.icon.color,
      },
    },
  },
  startIcon: {
    marginTop: -theme.spacing(0.2),
  },
}));

export default useStyles;
