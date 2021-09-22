import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

const styles = makeStyles(() => ({
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
    fontSize: "3em",
  },
}));

export const useFormStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  loginFormWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "& > div": {
      "&:first-child": {
        marginBottom: `${theme.spacing(3.75)}px`,
      },
      "& label": {
        color: "#FFFFFF !important",
      },
      "& div": {
        color: "#FFFFFF",
      },
    },
    "& button": {
      background: "linear-gradient(270.95deg, #9A9DF1 0%, #484CBA 100%)",
    },
  },
  loginForgetPasswordLink: {
    alignSelf: "flex-end",
    fontSize: "1.4rem",
    margin: `${theme.spacing(1.25)}px 0`,
    textDecoration: "underline",
  },
}));
export default styles;
