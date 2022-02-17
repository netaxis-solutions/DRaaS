import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const EntitlementsStyle = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    maxWidth: 793,
    display: "flex",
    flexDirection: "column",
    gap: 34,
  },
  title: {
    display: "flex",
    gap: 14,
    paddingLeft: 5,
    fontSize: "16px",
  },
  iconTriangle: {
    fill: "orange",
  },
  list: {
    border: "1px solid #EBEBF7",
    padding: "32px 16px 16px 30px",
    borderRadius: 10,
    fontSize: "16px",

    "& > span": {
      display: "block",
      paddingRight: 107,
    },
    "& div": {
      display: "flex",
      justifyContent: "end",
    },
  },
  listTitle: {
    paddingTop: 35,
  },
  Link: {
    color: "#4975E5",
    textDecoration: "none",
  },
  buttonConfirm: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
    width: 250,
    marginTop: 20,
    display: "flex",

    "&:hover": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: theme.palette.primary.white,
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
}));
