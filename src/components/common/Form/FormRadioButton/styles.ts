import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    "&.MuiRadio-root:hover": {
      backgroundColor: "transparent",
    },
    "&.MuiSvgIcon-root": {
      border: `1px solid ${theme.palette.icon.active}`,
      borderRadius: "50%",
      fill: `#fff`,
    },
  },
  iconChecked: {
    borderRadius: "50%",
    fill: `${theme.palette.icon.active}`,
  },
}));

export default useStyles;
