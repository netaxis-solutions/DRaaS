import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const EntitlementsStyle = makeStyles((theme: ThemeDefaultOptions) => ({
  buttonCancel: {
    position: "absolute",
    right: theme.spacing(5),
    zIndex: 1001,
    top: theme.spacing(-8),
  },
  progressIndicate: {
    maxWidth: 300,

    "& span": {
      borderRadius: 10,
      height: 6,
      backgroundColor: theme.palette.primary.light,
      "& > span": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },

  StepperRoot: {
    "& .MuiStepConnector-root": {
      marginLeft: theme.spacing(1),
      borderLeftStyle: "solid",
      borderLeftWidth: 1,
      borderColor: theme.palette.input.border,
    },
    "& .MuiStepContent-root": {
      borderLeftStyle: "solid",
      borderLeftWidth: 2,
      borderColor: theme.palette.input.border,
      marginLeft: theme.spacing(1),
    },
  },
  Step: {
    "& > span": {
      paddingTop: 0,
      paddingBottom: 0,
      "& > span:last-child": {
        paddingLeft: theme.spacing(1.1),
      },
      "& > span:first-child": {
        "& svg": {
          "& > text": {
            fill: "transparent",
          },
        },
      },
    },

    "& .MuiStepLabel-iconContainer": {
      height: 18,
      width: 20,

      "& .Mui-active": {
        width: 18,
        height: 18,
        fill: theme.palette.primary.main,
      },
      "& svg": {
        width: 18,
        height: 18,
        "& path": {
          fill: theme.palette.status.success,
        },
      },
    },
  },

  StepperLabel: {
    "& .MuiStepLabel-label": {
      fontSize: "1.4rem",
      fontWeight: 300,
    },
  },
  StepperContent: {
    "& .MuiCollapse-wrapperInner": {
      paddingTop: theme.spacing(1.5),
    },

    fontSize: "1.4rem",
    fontWeight: 300,
  },
  StepperWrapper: {
    border: `1px solid ${theme.palette.primary.light}`,
    maxWidth: 644,
    padding: "16px 31px",
    borderRadius: 10,
  },
  isError: {
    display: "flex",
    alignItems: "center",
  },
  isErrorNote: {
    border: `1px solid ${theme.palette.secondary.alertBorder}`,
    borderRadius: 10,
    backgroundColor: theme.palette.secondary.alertBackground,
    width: "100%",
    fontSize: "1.4rem",
    padding: theme.spacing(1.25),
    margin: theme.spacing(1.25),
  },
  buttonRetry: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white,
    width: 93,
    "& span": {
      "& svg": {
        "& path": {
          fill: theme.palette.primary.white,
        },
      },
    },

    "&:hover": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: theme.palette.primary.white,
    },
  },
}));
