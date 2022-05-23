import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  mainContentContainer: {
    background: theme.body.background,
    fontFamily: theme.body.fontFamily,
    display: "flex",
    height: "calc(100% - 52px)",
    "& > div": {
      position: "relative",
      "& > div": {
        height: "auto !important",
      },
    },
    "& > div:last-child": {
      position: "initial !important",
    },
  },
  wrapper: {
    width: "100% ",
  },
}));

export default useStyles;
