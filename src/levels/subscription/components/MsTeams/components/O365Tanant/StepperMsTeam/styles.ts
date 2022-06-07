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
      backgroundColor: theme.body.stepper.progressBarBackground,
      "& > span": {
        backgroundColor: theme.body.stepper.progressBarActive,
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
        fill: theme.body.stepper.stepsCircle.active,
      },
      "& svg": {
        width: 18,
        height: 18,
        "& path": {
          fill: theme.body.stepper.stepsCircle.success,
        },
      },
    },
  },

  StepperLabel: {
    "& .MuiStepLabel-label": {
      fontSize: "1.4rem",
      fontWeight: 300,
      color: theme.body.stepper.text,
    },
  },
  StepperContent: {
    "& .MuiCollapse-wrapperInner": {
      paddingTop: theme.spacing(1.5),
      color: theme.body.stepper.secondaryText,
    },

    fontSize: "1.4rem",
    fontWeight: 300,
  },
  StepperWrapper: {
    background: theme.body.stepper.background,
    border: `1px solid ${theme.body.stepper.border}`,
    maxWidth: 644,
    padding: "16px 31px",
    borderRadius: 10,
  },
  isError: {
    display: "flex",
    alignItems: "center",
  },
  isErrorNote: {
    border: `1px solid ${theme.body.stepper.errorBorder}`,
    borderRadius: 10,
    backgroundColor: theme.body.stepper.errorNotesBackground,
    width: "100%",
    fontSize: "1.4rem",
    padding: theme.spacing(1.25),
    margin: theme.spacing(1.25),
  },
  buttonRetry: {
    width: 93,
    "& span": {
      "& svg": {
        "& path": {
          fill: theme.body.general.icons.whiteFill,
        },
      },
    },
  },
}));
