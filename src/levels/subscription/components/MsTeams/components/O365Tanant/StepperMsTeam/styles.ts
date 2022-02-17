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
      marginLeft: 8,
      borderLeftStyle: "solid",
      borderLeftWidth: 1,
      borderColor: theme.palette.input.border,
    },
    "& .MuiStepContent-root": {
      borderLeftStyle: "solid",
      borderLeftWidth: 2,
      borderColor: theme.palette.input.border,
      marginLeft: 8,
    },
  },
  Step: {
    "& > span": {
      paddingTop: 0,
      paddingBottom: 0,
      "& > span:last-child": {
        paddingLeft: 9,
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
      fontSize: 14,
      fontWeight: 300,
    },
  },
  StepperContent: {
    "& .MuiCollapse-wrapperInner": {
      paddingTop: 12,
      "& span:last-child": {
        marginTop: 10,
      },
    },

    fontSize: 14,
    fontWeight: 300,
  },
  StepperWrapper: {
    border: "1px solid #EBEBF7",
    maxWidth: 644,
    padding: "16px 31px",
    borderRadius: 10,
  },
}));
