import { createStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const tabStyles = createStyles((theme: ThemeDefaultOptions) => ({
  textColorInherit: {
    color: theme.body.tabs.color,
    textTransform: "none",
    fontSize: "1.4rem",
    fontWeight: 300,
    lineHeight: "1.6rem",
    opacity: 1,
  },
  root: {
    marginBottom: "-1px",
    border: "1px solid transparent",
    padding: `0 ${theme.spacing(2.5)}px`,
    minHeight: "auto",
    height: 40,
    minWidth: "fit-content",
  },
  selected: {
    "&$textColorInherit": {
      color: theme.body.tabs.active.color,
      fontWeight: "400",
    },
    border: `1px solid ${theme.body.tabs.active.border}`,
    borderRadius: "6px 6px 0 0",
    borderBottom: `1px solid ${theme.body.tabs.active.borderBottom}`,
  },
}));

export default createStyles((theme: ThemeDefaultOptions) => ({
  root: {
    boxShadow: "none",
    minHeight: "auto",
    height: 40,
    marginBottom: theme.spacing(3.75),
  },
  scroller: {
    "&>*": {
      borderBottom: "1px solid" + theme.body.tabs.border,
    },
  },
  indicator: {
    display: "none",
    borderBottom: "1px solid" + theme.palette.icon.hover,
  },
}));
