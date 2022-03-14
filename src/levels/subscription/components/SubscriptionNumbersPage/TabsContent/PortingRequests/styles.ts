import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  greyTime: {
    color: theme.palette.secondary.text,
  },
  multipleNumbers: {
    cursor: "pointer",
  },
}));
