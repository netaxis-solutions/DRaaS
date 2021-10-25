import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  iconsBarWrapper: {
    margin:
      theme.direction === "ltr"
        ? `0 ${theme.spacing(2.75)}px 0 auto`
        : `0 auto 0 ${theme.spacing(2.75)}px`,
    "& svg": {
      fill: theme.palette.primary.main,
      width: 16,
      height: 16,
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
}));

export default useStyles;
