import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const EntitlementsStyle = makeStyles((theme: ThemeDefaultOptions) => ({
  adminBody: {
    display: "flex",
    color: theme.body.universal.secondatyText,
    flexDirection: "column",
    fontSize: "1.4rem",
    lineHeight: "2rem",
    fontWeight: 400,
    "& a": {
      textDecoration: "none",
      color: theme.body.universal.link,
    },
    "& ul": {
      paddingLeft: theme.spacing(2.5),
      marginTop: theme.spacing(0.7),
    },
  },
  checkboxStyling: {
    color: `${theme.body.checkbox.label.text} !important`,
    fontSize: "1.4rem",
    "& a": {
      textDecoration: "none",
      color: theme.body.universal.link,
    },
  },
  deleteButton: {
    "& svg": {
      "& path": {
        fill: `${theme.body.button.action.icon.color} !important`,
      },
    },
  },
  formRoot: {
    marginTop: theme.spacing(3.75),
    maxWidth: "690px",
    "& > div": {
      maxWidth: "500px",
    },
    "& > div:last-child": {
      maxWidth: "600px",
      display: "flex",
      justifyContent: "end",
      marginTop: theme.spacing(3.75),
    },
  },
  formCheckbox: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1.25),
    height: 110,
    "& label": {
      height: 30,
      "& svg": {
        width: "20px",
        height: "20px",
      },
    },
  },
  errorBorderCheckbox: {
    "& label": {
      "& span": {
        color: theme.body.checkbox.error.color,
      },
    },
  },
  errorNotificationCheckbox: {
    fontSize: "1.4rem !important",
  },
  buttonConfirm: {
    width: "136px",
    "& span": {
      width: "90%",
      "& span:first-child": {
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "& svg": {
        fill: `${theme.body.universal.white} !important`,
        width: "65%",

        height: "20px",
        paddingTop: 1,
      },
    },
  },
  multiFormRoot: {
    maxWidth: "500px",
    marginTop: theme.spacing(3.75),
  },
  multiSubmitGroupRoot: {
    maxWidth: 500,
    display: "flex",
    justifyContent: "end",
    gap: theme.spacing(2.1),
    "& button": {
      maxWidth: 90,
      width: 90,
      "& svg": {
        "& path": {
          fill: theme.body.button.normal.icon.color,
        },
      },
    },
  },
  successLogin: {
    display: "flex",
    alignItem: "center",
    gap: theme.spacing(1.15),
  },
}));
