import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  menuElLinkWrapper: {
    display: "flex",
    height: "100%",
    borderBottom: `2px solid  transparent`,
    alignItems: "center",
  },
  menuElLinkWrapperActive: {
    borderBottom: `2px solid  ${theme.top_bar.menuLinkActive}`,
  },
  menuElLink: {
    margin: `0 ${theme.spacing(2.25)}px`,
    color: theme.top_bar.text,
    textDecoration: "none",
    border: "1px solid transparent",
    "&:hover": {
      color: theme.top_bar.activeButtonFont,
      backgroundColor: theme.top_bar.activeButtonBackground,
      border: theme.top_bar.activeButtonBorder,
    },
  },
  menuElLinkActive: {
    color: theme.top_bar.menuLinkActive,
  },
}));

export default useStyles;
