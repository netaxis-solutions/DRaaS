import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const EntitlementsStyle = makeStyles((theme: ThemeDefaultOptions) => ({
  adminBody: {
    display: "flex",
    color: theme.body.general.secondatyText,
    flexDirection: "column",
    fontSize: "1.4rem",
    lineHeight: "2rem",
    fontWeight: 400,
    "& a": {
      textDecoration: "none",
      color: theme.body.general.textStyle.link,
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
      color: theme.body.general.textStyle.link,
    },
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
  },
  deleteButton: {
    background: theme.body.button.cancel.background,
    color: theme.body.button.cancel.text,
    border: theme.body.button.cancel.border,
    "& svg": {
      "& path": {
        fill: `${theme.body.button.action.icon.color} !important`,
      },
    },
    "&:hover": {
      background: `${theme.body.button.cancel.background} !important`,
      color: theme.body.button.cancel.text,
      border: theme.body.button.cancel.border,
      "& svg": {
        "& path": {
          fill: theme.body.button.cancel.icon.color,
        },
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
        width: 20,
        height: 20,
      },
    },
  },
  title: {
    display: "flex",
    gap: theme.spacing(2),
    paddingLeft: theme.spacing(0.65),
    fontSize: "1.6rem",
    width: 500,
  },
  iconTriangle: {},
  iconTriangleAlert: {
    width: 25,
    "& path": {
      fill: theme.body.card.icon.triangle.error,
    },
  },
  alertTitle: {
    width: 500,
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
    width: 136,
    "& span": {
      width: "90%",
      "& span:first-child": {
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "& svg": {
        fill: `${theme.body.general.icons.whiteFill} !important`,
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
  mainWrapper: {
    display: "flex",
    gap: theme.spacing(3.1),
    alignItems: "center",
    justifyContent: "space-between",
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
    "& svg": {
      width: 16,
      height: 16,
    },
  },
  adminWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.45),
  },

  errorNotification: {
    fill: theme.palette.status.error,
    width: 16,
    height: 16,
  },
}));

export const O365AdminSkeletonStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    buttonsWrapper: {
      display: "flex",
      justifyContent: "flex-end",
      gap: theme.spacing(1.25),
      width: 500,
      "& >*": {
        borderRadius: 5,
      },
    },
    text: {
      marginBottom: "20px!important",
    },
    rectangle: {
      marginBottom: 15,
    },
  }),
);
