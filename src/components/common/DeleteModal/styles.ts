import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  modal: {
    margin: 0,
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: 1300,
    background: theme.body.general.backgrounds.white,
    width: 450,
    transform: "translate(-50%, -50%)",
    padding: `${theme.spacing(7.375)}px ${theme.spacing(
      3.125,
    )}px ${theme.spacing(4.375)}px`,
    textAlign: "center",
  },
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1299,
  },
  cancelButton: {
    marginRight: theme.spacing(1.875),
    "&& svg": {
      width: 10,
      height: 10,
      marginTop: 2,
    },
  },
  closeIcon: {
    position: "absolute",
    zIndex: 1500,
    top: theme.spacing(2.25),
    right: theme.spacing(1.5),
    padding: 0,
    "& svg": {
      width: 14,
      height: 14,
      fill: theme.palette.icon.main,
    },
  },
}));

export default useStyles;
