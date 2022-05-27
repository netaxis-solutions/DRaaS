import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  button: {
    background: theme.body.button.normal.background,
    color: theme.body.button.normal.text,
    border: theme.body.button.normal.border,
    padding: 15,
    "&.Mui-disabled": {
      background: theme.body.button.disabled.background,
      color: theme.body.button.disabled.text,
      border: theme.body.button.disabled.border,
    },
    "& svg": {
      width: 18,
      "& path": {
        fill: theme.body.button.normal.icon.color,
      },
    },
    "&:hover": {
      "& svg": {
        "& path": {
          fill: theme.body.button.action.icon.color,
        },
      },
    },
  },
  wrapper: {
    border: theme.body.card.border,
    boxSizing: "border-box",
    borderRadius: "10px",
    width: "30%",
    minWidth: 280,
    padding: 30,
    display: "flex",
    gap: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: 300,
    fontSize: "1.6rem",
    lineHeight: "1.8rem",
    color: theme.palette.primary.text,
    background: theme.body.card.background,
  },
  content: {
    minHeight: 50,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
  },
  buttonWrapperWithToolTip: {
    position: "relative",
  },
}));

export default useStyles;
