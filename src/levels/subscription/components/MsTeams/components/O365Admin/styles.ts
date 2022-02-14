import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const EntitlementsStyle = makeStyles((theme: ThemeDefaultOptions) => ({
  adminBody: {
    display: "flex",
    color: theme.palette.secondary.text,
    flexDirection: "column",
    fontSize: "1.4rem",
    lineHeight: "2rem",
    fontWeight: 400,
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.newLink,
    },
    "& ul": {
      paddingLeft: "20px",
      marginTop: "5px",
    },
  },
  checkboxStyling: {
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.newLink,
    },
  },
  formRoot: {
    marginTop: 30,
    maxWidth: "690px",
    "& > div": {
      maxWidth: "500px",
    },
    "& > div:last-child": {
      maxWidth: "600px",
      display: "flex",
      justifyContent: "end",
      marginTop: 30,
    },
  },
  formCheckbox: {
    display: "flex",
    flexDirection: "column",
  },
  buttonConfirm: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
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
        fill: `${theme.palette.primary.white} !important`,
        width: "65%",
        height: "20px",
        paddingTop: 1,
      },
    },
  },
  multiFormRoot: {
    maxWidth: "500px",
    marginTop: 30,
  },
  multiSubmitGroupRoot: {
    maxWidth: 500,
    display: "flex",
    justifyContent: "end",
    gap: 18,
    "& button": {
      maxWidth: 90,
      width: 90,
    },
  },
  successLogin: {
    display: "flex",
    alignItem: "center",
    gap: "10px",
  },
}));
