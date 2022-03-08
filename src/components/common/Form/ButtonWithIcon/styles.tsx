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
      background: `${theme.body.button.action.background} !important`,
      color: theme.body.button.action.text,
      border: theme.body.button.action.border,
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
  cancelButton: {
    background: theme.body.button.cancel.background,
    color: theme.body.button.cancel.text,
    border: theme.body.button.cancel.border,
    "& svg": {
      "& path": {
        fill: theme.body.button.cancel.icon.color,
      },
    },
    "&:hover": {
      background: `${theme.body.button.cancel.background} !important`,
      color: theme.body.button.cancel.text,
      border: theme.body.button.cancel.border,
      "& svg": {
        "& path": {
          fill: theme.body.button.cancel.icon.color,
        },
      },
    },
  },
  startIcon: {
    marginTop: -theme.spacing(0.2),
  },
}));

export default useStyles;
