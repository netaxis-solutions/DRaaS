import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  menuElLinkWrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
  },
  menuElLinkWrapperActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    gap: theme.spacing(1),
    alignItems: "center",
    "& div": {
      border: `1px solid ${theme.top_bar.menuLinkActive}`,
      display: "block",
      borderRadius: "5px",
    },
  },
  activeMenu: {
    width: "calc(100% - 36px)",
    height: 4,
    background: theme.top_bar.menuLinkActive,
    display: "none",
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
