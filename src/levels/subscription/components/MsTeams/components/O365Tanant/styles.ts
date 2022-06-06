import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const O365Styles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    maxWidth: 793,
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4.25),
    color: theme.body.card.text,
  },
  title: {
    display: "flex",
    gap: theme.spacing(2),
    paddingLeft: theme.spacing(0.65),
    fontSize: "1.6rem",
    width: 800,
  },
  iconTriangle: {},
  iconTriangleAlert: {
    width: 50,
    "& path": {
      fill: theme.body.card.icon.triangle.error,
    },
  },
  alertTitle: {
    width: 758,
  },
  list: {
    border: theme.body.card.border,
    padding: "32px 16px 16px 30px",
    background: theme.body.card.background,

    borderRadius: 10,
    fontSize: "1.6rem",

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
    color: theme.body.general.textStyle.link,
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
        fill: `${theme.body.general.icons.whiteFill} !important`,
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
    border: `1px solid ${theme.body.general.borders.light}`,
    borderRadius: 10,
    background: theme.body.card.background,
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
  errorIcon: {
    height: 20,
    width: 20,
    transform: "rotate(0.5turn)",
    "& >svg": { fill: theme.palette.status.error },
  },
}));
