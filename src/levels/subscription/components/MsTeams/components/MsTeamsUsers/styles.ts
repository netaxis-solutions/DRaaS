import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  button: {
    "&": {
      width: 20,
      height: 20,
      padding: 0,
      "&>*>*": {
        width: "100%",
        height: "100%",
        "&>path": {
          fill: theme.palette.secondary.text,
          width: "100%",
          height: "100%",
        },
      },
    },
  },
  selectCountry: {
    maxWidth: 400,
    minWidth: 150,
    "&>*>div": {
      background: theme.palette.primary.white,
      "& button[aria-label='Clear']": {
        display: "none",
      },
    },
  },
  licenses: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(0.5),
    width: "100%",
  },
  width100: {
    width: "90%",
  },
  iconButton: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&& svg": {
      fill: theme.palette.secondary.text,
      marginLeft: 0,
    },
  },
  numberWithLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1.25),
    width: "100%",
  },
  active: { background: theme.palette.status.success },
  error: { background: "#df2231" },
  updating: { background: theme.palette.primary.main },
  label: {
    height: 14,
    minWidth: 50,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.75rem",
    lineHeight: "0.9rem",
    color: theme.palette.primary.white,
    textTransform: "uppercase",
  },
  selectNumber: {
    "&": {
      margin: 0,
      width: 180,
      height: 34,
      "&>*>div": {
        height: 34,
        background: theme.palette.primary.white,
        "&>input": {
          height: "100%",
          position: "absolute",
          top: "0px",
          left: "20px",
          width: "69%!important",
        },
      },
      "&>*>label": {
        top: -4,
      },
    },
  },
  selectController: {
    "&>div": {
      margin: 0,
      height: 46,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  centred: {
    marginLeft: 35,
  },
  assignedNumberWrapper: {
    display: "flex",
    justifyContent: "start",
    alignItem: "center",
    gap: theme.spacing(1.2),
  },
  assignedNumberButtons: {
    display: "flex",
    justifyContent: "start",
    width: "100%",
    "& div": {
      maxWidth: "90%",
    },
  },
  errorNotification: {
    fill: theme.palette.status.error,
    transform: "rotate(180deg)",
    width: 20,
    height: 20,
  },
  icon: {
    height: 20,
    width: 20,
    "& >svg": {
      width: "100%",
      height: "100%",
      fill: "#000",
    },
  },
  reloadButton: {
    "& >svg": {
      fill: "#000",
    },
    "&:hover": {
      cursor: "pointer",
    },
    "&:active": {
      transform: "scale(0.9)",
    },
  },
  flags: {
    "& img": {
      width: "20px !important",
      height: 16,
    },
  },
  check: {
    "& >svg": {
      fill: theme.palette.primary.white,
    },
  },
  cross: {
    transform: "rotate(45deg)",
    "& >svg": {
      fill: theme.palette.status.error,
    },
  },
  rotateAnimation: {
    animation: `$rotating 1.5s linear infinite`,
  },
  "@keyframes rotating": {
    "0%": { transform: "rotate(0deg)" },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  tableTitle: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.25),
  },
}));
