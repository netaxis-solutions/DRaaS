import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  arrowsWrapper: {
    display: "flex",
    justifyContent: "center",
    "& svg": {
      fill: theme.palette.secondary.text,
    },
  },
  typeName: {
    textTransform: "capitalize",
    fontWeight: 300,
    fontSize: "1.4rem !important",
    lineHeight: "1.6rem !important",
  },
}));
