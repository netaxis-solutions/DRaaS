import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  wrapper: {
    margin: 30
  },
  root: {
    border: `1px solid ${theme.palette.primary.light}`,
  },
  actionRow: {
    textAlign: 'end',
  },
  hover: {
    "&:hover": {
      backgroundColor: "#F5F7FF",
    }
  }
}));
