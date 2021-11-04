import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableWrapper: {
    margin: 30
  },
  tableRoot: {
    border: `1px solid ${theme.palette.primary.light}`
  }
}));
