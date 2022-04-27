import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useProfileTabStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    profileWrapper: {
      maxWidth: 400,
    },
    warningText: {
      color: theme.palette.status.alert,
    },
  }),
);
