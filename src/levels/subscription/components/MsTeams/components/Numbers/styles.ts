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
      paddingLeft: theme.spacing(3),
    },
  },

  listWrapper: {
    background: theme.body.general.backgrounds.white,
    borderRadius: theme.spacing(1),
  },
  listHeaderWrapper: {
    paddingLeft: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    "& span": {
      display: "flex",
    },
  },
  listHeaderColumns: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    "& span": {
      display: "block",
      width: "100%",
    },
  },
  listTitle: {
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& div:first-child": {
      width: 191,
    },
    "& div:last-child": {
      width: "50%",
      padding: 0,
      "& .MuiFormControl-root, .MuiTextField-root": {
        width: 191,
      },
      "& .MuiInputBase-root, .MuiOutlinedInput-root": {
        width: "100%",
        "& fieldset": {
          border: "1px solid transparent",
        },
        "& div": {
          width: 30,
        },
      },
    },
  },
  titleLeft: {
    paddingLeft: theme.spacing(3.75),
    fontWeight: 450,
    fontSize: "1.6rem",
    fontVariant: "small-caps",
  },
  listPagination: {
    padding: "16px 0 12px 30px",
    width: "100%",
    height: 50,
    display: "block",
    borderRadius: theme.spacing(1),
    fontWeight: 400,
    fontSize: "1.6rem",
  },
  checkbox: {
    stroke: theme.body.general.checkbox.border,
    fill: theme.body.general.backgrounds.white,
  },
  checkboxChecked: {},
  listItems: {
    display: "flex",
    gap: theme.spacing(1.25),
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    alignItems: "center",
  },
  listElementText: {
    width: "100%",
    display: "flex",
    "& span": {
      display: "block",
      width: "100%",
      paddingLeft: theme.spacing(0.5),
    },
  },
  styleCancel: {
    color: `${theme.body.button.cancel.text} !important`,
    background: `${theme.body.button.cancel.background} !important`,
    border: `${theme.body.button.cancel.border} !important`,
    "& svg": {
      "& path": {
        fill: `${theme.body.button.cancel.icon.color} !important`,
        stroke: `${theme.body.button.cancel.icon.color} !important`,
      },
    },
  },
  topTextWrapper: {
    paddingBottom: theme.spacing(1),
  },
}));
