import { createStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const tabStyles = createStyles((theme: ThemeDefaultOptions) => ({
  textColorInherit: {
    color: theme.palette.primary.text,
    fontSize: "1.4rem",
    fontWeight: 300,
    lineHeight: "1.6rem",
    opacity: 1,
    textTransform: "none",
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
      color: theme.palette.primary.main,
      fontWeight: "400",
    },
    border: `1px solid ${theme.palette.icon.hover}`,
    borderRadius: "6px 6px 0 0",
    borderBottom: `1px solid ${theme.palette.primary.background}`,
  },
}));

export default createStyles((theme: ThemeDefaultOptions) => ({
  root: {
    boxShadow: "none",
    minHeight: "auto",
    height: 40,
  },
  scroller: {
    "&>*": {
      borderBottom: "1px solid" + theme.palette.icon.hover,
    },
  },
  indicator: {
    display: "none",
    borderBottom: "1px solid" + theme.palette.icon.hover,
  },
}));
