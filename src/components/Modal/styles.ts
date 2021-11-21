import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  modal: {
    margin: 0,
    position: "fixed",
    top: 40,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: theme.palette.primary.white,
  },
}));

export default useStyles;
