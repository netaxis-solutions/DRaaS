import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const SipTrunksItemElement = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    wrapper: {
      border: `1px solid ${theme.body.card.sipTrunkCard.border}`,
      display: "flex",
      height: 60,
      color: theme.body.card.sipTrunkCard.text,
      maxWidth: 514,
      alignItems: "center",
      borderRadius: 6,
      background: theme.body.card.sipTrunkCard.background,
      boxShadow: "0px 8px 10px rgba(54, 100, 247, 0.15)",
    },
    leftLine: {
      height: 60,
      borderRadius: "6px 0 0 6px",
      width: 16,
      background: "#8BB439",
      marginLeft: "-1px ",
    },
    leftSide: {
      display: "flex",
      alignItems: "center",
    },
    rightSide: {
      display: "flex",
      alignItems: "center",
    },
    routeButton: {
      "& button": {
        width: 24,
        height: 24,
        border: "1px solid transparent",
        background: theme.body.button.cancel.background,
        "& path": {
          fill: theme.body.button.cancel.icon.iconButtonArrow,
        },
      },
    },
    trashButton: {
      "& button": {
        width: 24,
        height: 24,
        border: "1px solid transparent",
        background: theme.body.button.cancel.background,
        "& path": {
          stroke: theme.body.card.sipTrunkCard.icon.trash,
        },
      },
    },
  }),
);
