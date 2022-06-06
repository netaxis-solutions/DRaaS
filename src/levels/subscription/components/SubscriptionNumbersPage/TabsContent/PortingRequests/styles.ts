import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  greyTime: {
    color: theme.body.general.textStyle.brown,
  },
  multipleNumbers: {
    cursor: "pointer",
  },
  modalLink: {
    cursor: "pointer",
    color: theme.body.general.textStyle.link,
    display: "contents",
  },
  noNumbersBlock: {
    display: "flex",
    margin: "auto",
    gap: theme.spacing(2.5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));
