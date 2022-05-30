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
          fill: `${theme.body.button.action.hover.icon} !important`,
          stroke: `${theme.body.button.action.hover.icon} !important`,
        },
      },
    },

    padding: `${theme.spacing(1.25)}px ${theme.spacing(2.5)}px`,
    "& svg": {
      width: 16,
      fill: theme.body.table.button.icon,
      height: 16,
      "& path": {
        fill: `${theme.body.button.action.text}`,
        stroke: `${theme.body.button.action.text}`,
      },
    },
  },
  startIcon: {
    marginTop: -theme.spacing(0.2),
  },
}));

export default useStyles;
