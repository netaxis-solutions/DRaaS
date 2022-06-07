import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    padding: 0,
    borderRadius: 6,
    "& span": {
      marginLeft: -theme.spacing(0.125),
    },
    "&:hover": {
      backgroundColor: theme.body.general.hover,
    },
    "&:active": {
      backgroundColor: theme.palette.icon.active,
      "& svg": {
        fill: theme.body.general.icons.whiteFill,
      },
    },
  },
}));

export default useStyles;
