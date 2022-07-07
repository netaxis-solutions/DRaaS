import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  flags: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    "& img": {
      width: "20px !important",
      height: 16,
    },
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
  text: {
    fontSize: "1.4rem",
    fontWeight: 300,
    marginBottom: theme.spacing(3.75),
    maxHeight: 250,
    overflow: "auto",
  },
  boldText: {
    fontWeight: 400,
    overflowWrap: "anywhere",
  },
  textWithInput: {
    marginBottom: theme.spacing(1.875),
  },
  modalWrapper: {
    zIndex: 500,
  },

  modalButtonWrapper: {
    zIndex: 501,
  },
  textWithIcon: {
    display: "flex",
    justifyContent: "start",
    gap: theme.spacing(1.5),
    "& div": {
      width: 20,
      height: 20,
    },
    "& svg": {
      width: 20,
      height: 20,
    },
  },
  boldTextTitle: {
    fontWeight: 700,
  },
  errorTextWrapper: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    "& span:first-child": {
      marginBottom: theme.spacing(2.5),
    },
    "& ul": {
      margin: 0,
      paddingLeft: 24,
    },
  },
}));
