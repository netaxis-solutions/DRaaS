import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  errorNotification: {
    width: 20,
    height: 20,
    "& path": {
      fill: theme.body.general.textStyle.link,
    },
  },
  columnHeaderWrapper: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    textTransform: "uppercase",
  },
}));
