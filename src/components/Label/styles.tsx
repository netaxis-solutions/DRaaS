import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  label: {
    boxSizing: "border-box",
    height: 24,
    width: 100,
    borderRadius: 6,
    border: "1px solid",
    padding: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    lineHeight: "1.25rem",
    color: theme.body.general.textStyle.white,
    textTransform: "uppercase",
  },
  active: {
    background: theme.label.active.background,
    borderColor: theme.label.active.borderColor,
    color: theme.label.active.textColor,
  },
  preActive: {
    background: theme.label.preActive.background,
    borderColor: theme.label.preActive.borderColor,
    color: theme.label.preActive.textColor,
  },
}));
