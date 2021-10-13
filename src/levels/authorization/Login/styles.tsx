import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const styles = makeStyles((theme: ThemeDefaultOptions) => ({
  loginContainer: {
    width: "100%",
    height: "100vh",
    background: "#212356",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(/branding/default/img/bck.png)",
    backgroundSize: "cover",
  },
  loginBorderForm: (props) => ({
    position: "absolute",
    background:
      "linear-gradient(135.1deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);",
    backdropFilter: "blur(42px)",
    borderRadius: 20,
    ...props,
  }),
  loginFormContainer: {
    borderRadius: 20,
    border: "1px solid #FFFFFF",
    maxWidth: 600,
    maxHeight: 600,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    color: "#FFFFFF",
    padding: `${theme.spacing(12.5)}px ${theme.spacing(12.5)}px ${theme.spacing(
      15
    )}px`,
    zIndex: 1,
  },
}));

export default styles;
