import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  topbarContainer: {
    width: "100%",
    height: 40,
    background: theme.palette.primary.light,
    display: "flex",
    alignItems: "center",
  },
  topBarLogoImage: {
    margin:
      theme.direction === "ltr"
        ? `${theme.spacing(0.5)}px ${theme.spacing(2.25)}px ${theme.spacing(
            0.5
          )}px ${theme.spacing(3.75)}px`
        : `${theme.spacing(0.5)}px ${theme.spacing(3.75)}px ${theme.spacing(
            0.5
          )}px ${theme.spacing(2.25)}px`,
  },
}));

export default useStyles;
