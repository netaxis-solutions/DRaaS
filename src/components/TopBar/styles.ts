import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  topbarContainer: {
    width: "100%",
    height: theme.top_bar.height,
    background: theme.top_bar.background,
    display: "flex",
    alignItems: "center",
    fontFamily: theme.top_bar.fontFamily,
    fontSize: theme.top_bar.fontSize,
    fontWeight: theme.top_bar.fontWeight,
  },
  topBarLogoImage: {
    margin:
      theme.direction === "ltr"
        ? `${theme.spacing(0.5)}px ${theme.spacing(2.25)}px ${theme.spacing(
            0.5,
          )}px ${theme.spacing(3.75)}px`
        : `${theme.spacing(0.5)}px ${theme.spacing(3.75)}px ${theme.spacing(
            0.5,
          )}px ${theme.spacing(2.25)}px`,
  },
}));

export default useStyles;
