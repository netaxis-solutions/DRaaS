import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const SipTrunksListStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  sipTrunksEmptyListWrapper: {
    marginTop: 185,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(3.85),
  },
  sipTrunksListWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

export const SipTrunksDetails = makeStyles((theme: ThemeDefaultOptions) => ({
  headerWrapper: {
    display: "flex",
    gap: theme.spacing(2),
    paddingTop: theme.spacing(2),
    alignItems: "start",
    justifyContent: "space-between",
    height: 100,
    "& div": {
      display: "flex",
      gap: theme.spacing(2),
      "& span": {
        fontWeight: 450,
        fontSize: "2.4rem",
        lineHeight: "2.4rem",
        fontVariant: "small-caps slashed-zero",
        textTransform: "lowercase",
      },
    },
    "& button:first-child": {
      width: 24,
      height: 24,
      border: "1px solid transparent",
      background: theme.body.button.cancel.background,
      "& path": {
        fill: theme.body.button.cancel.icon.iconButtonArrow,
      },
    },
  },
}));
