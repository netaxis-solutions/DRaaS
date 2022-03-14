import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const EntitlementsStyle = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    maxWidth: 793,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4.25),
    color: theme.body.card.text,
  },
  title: {
    display: "flex",
    gap: theme.spacing(1.75),
    paddingLeft: theme.spacing(0.65),
    fontSize: "16px",
  },
  iconTriangle: {
    fill: "orange",
  },
  list: {
    border: theme.body.card.border,
    padding: "32px 16px 16px 30px",
    background: theme.body.card.background,

    borderRadius: 10,
    fontSize: "16px",

    "& > span": {
      display: "block",
      paddingRight: theme.spacing(13.375),
    },
    "& div": {
      display: "flex",
      justifyContent: "end",
    },
  },
  listTitle: {
    paddingTop: theme.spacing(4.375),
  },
  Link: {
    color: "#4975E5",
    textDecoration: "none",
  },
  buttonUnlinkPositions: {
    display: "flex",
    justifyContent: "end",
  },
  buttonUnlink: {
    background: theme.body.button.error.background,
    color: theme.body.button.error.text,
    width: 250,
    marginTop: theme.spacing(2.5),
    display: "flex",

    "&:hover": {
      backgroundColor: `${theme.body.button.action.background} !important`,
      color: theme.body.button.action.text,
    },

    "& span": {
      width: "100%",
      "& span:first-child": {
        padding: 0,
        display: "flex",
        width: "15%",
      },
      "& svg": {
        fill: `${theme.palette.primary.white} !important`,
        width: "65%",
        height: "20px",
        paddingTop: 1,
      },
    },
  },
  buttonConfirm: {
    width: 250,
    marginTop: theme.spacing(2.5),
    display: "flex",

    "& span": {
      width: "100%",
      "& span:first-child": {
        padding: 0,
        display: "flex",
        width: "15%",
      },
      "& svg": {
        width: "65%",
        height: "20px",
        paddingTop: 1,
      },
    },
  },
  StatusWrapper: {
    maxWidth: 453,
  },
  InfoStatus: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: 10,
    "& > div": {
      display: "flex",
      flexDirection: "row",
      alignItem: "center",
      gap: theme.spacing(2.5),
      padding: theme.spacing(2.5),
      "& div": {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1.25),
        "& span": {
          display: "flex",
        },
      },
    },
  },
  SuccessIcon: {
    paddingTop: theme.spacing(0.65),
  },
}));
