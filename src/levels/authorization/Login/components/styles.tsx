import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const styles = makeStyles((theme: ThemeDefaultOptions) => ({
  loginFormHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginLogoImage: {
    width: 65,
    height: 65,
  },
  loginWelcomeText: {
    fontSize: "3rem",
    fontWeight: 300,
    marginTop: `${theme.spacing(2.5)}px`,
    marginBottom: `${theme.spacing(6.25)}px`,
  },
}));

export const useFormStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  loginFormWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "& svg": {
      //fill: theme.palette.primary.main,
      width: 16,
      height: 16,
    },
    "& > div": {
      "&:first-child": {
        marginBottom: `${theme.spacing(3.75)}px`,
      },
      "& label": {
        color: "#FFFFFF !important",
      },
      "& label.Mui-error.Mui-focused": {
        color: `${theme.palette.notification.error} !important`,
      },
      "& div": {
        color: "#FFFFFF",
      },
    },
    "& button": {
      "& svg": {
        fill: "white",
      },
    },
    "& > button": {
      background: "linear-gradient(270.95deg, #9A9DF1 0%, #484CBA 100%)",
      height: 46,
      width: "100%",
      color: "#FFFFFF",
      "&:hover": {
        color: "#FFFFFF",
      },
    },
  },
  loginPasswordInput: { "& > div": { marginBottom: theme.spacing(1.25) } },
  loginForgetPasswordLink: {
    textDecoration: "underline",
    fontSize: "1.4rem",
    color: theme.palette.primary.white,
    fontWeight: 300,
  },
  loginCheckboxAndLinkWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3.75),
    "& label": {
      "& span": {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  forgotPasswordText: {
    textAlign: "center",
    fontSize: "1.6rem",
    margin: `0 0 ${theme.spacing(6.25)}px`,
  },
  forgotPasswordNotificationContainer: {
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.notification.success,
    borderRadius: 6,
    marginTop: -theme.spacing(5.25),
    marginBottom: theme.spacing(1),
  },
  forgotPasswordErrorNotificationContainer: {
    backgroundColor: theme.palette.notification.error,
  },
  forgotPasswordNotificationText: {
    color: theme.palette.primary.text,
    fontSize: "1.6rem",
    lineHeight: "20px",
  },
  resetButton: {
    marginTop: theme.spacing(7),
  },
}));

export default styles;
