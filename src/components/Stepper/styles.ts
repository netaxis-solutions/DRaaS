import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  stepperWrapper: {
    display: "flex",
    fontSize: "1.6rem",
    padding: `0 ${theme.spacing(8.75)}px ${theme.spacing(2.75)}px`,
  },
  stepWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  stepInfoWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: `${theme.spacing(0.5)}px`,
  },
  stepIcon: {
    width: 16,
    height: 16,
    background: theme.palette.icon.main,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fill: "#FFFFFF !important",
      width: "8px !important",
      height: "8px !important",
    },
  },
  stepIconActive: { background: theme.palette.icon.active },
  stepConnector: {
    height: 1,
    width: 200,
    margin: `0 ${theme.spacing(1)}px`,
    background: theme.palette.secondary.text,
  },
  stepTitleWrapper: {
    maxWidth: 220,
  },
  notActiveStep: {
    fontWeight: 300,
  },
  stepperOptionalTitle: {
    margin: 0,
    color: theme.palette.secondary.text,
    fontSize: "1.2rem",
  },
}));

export default useStyles;
