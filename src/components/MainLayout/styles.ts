import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  mainContentContainer: {
    background: theme?.body?.background,
    fontFamily: theme?.body?.fontFamily,
    display: "flex",
    minHeight: "calc(100% - 52px)",
    "& > div": {
      "& > div": {
        height: "auto !important",
      },
    },
  },
  wrapper: {
    width: "100%",
  },
}));

export default useStyles;
