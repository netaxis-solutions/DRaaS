import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useButtonStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    height: 36,
    background: theme.palette.primary.main,
    borderRadius: 6,
    color: "#FFFFFF",
    fontSize: "1.4rem",
  },
  label: {
    textTransform: "capitalize",
  },
}));

export default useButtonStyles;
