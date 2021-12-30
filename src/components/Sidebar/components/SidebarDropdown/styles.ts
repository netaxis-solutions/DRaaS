import { makeStyles } from "@material-ui/core";

import { LoggedInUserType } from "utils/types/routingConfig";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  select: {
    height: theme.spacing(3.5),
    marginLeft: theme.spacing(1.875),
    border: (props: { currentLevel: LoggedInUserType }) =>
      `1px solid ${theme.palette.sidebar[props.currentLevel]}`,
    color: `${theme.palette.menuLink.active} !important`,
    "& svg": {
      color: `${theme.palette.menuLink.active} !important`,
    },
    "& fieldset": {
      display: "none",
    },
    "& > div": {
      padding: `${theme.spacing(0.75)}px ${theme.spacing(1.25)}px`,
    },
  },
  menuItem: {},
}));

export default useStyles;
