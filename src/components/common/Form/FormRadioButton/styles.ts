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
    border: `1px solid ${theme.palette.icon.active}`,
    fill: `${theme.palette.icon.active}`,
    padding: "1.3px",
  },
}));

export default useStyles;
