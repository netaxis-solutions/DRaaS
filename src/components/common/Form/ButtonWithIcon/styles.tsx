import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    padding: `${theme.spacing(1.25)}px ${theme.spacing(2.5)}px`,
    "& svg": {
      width: 14,
      height: 14,
    },
  },
  startIcon: {
    marginTop: -theme.spacing(0.2),
  },
}));

export default useStyles;
