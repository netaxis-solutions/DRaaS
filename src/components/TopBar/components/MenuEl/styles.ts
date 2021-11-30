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
    borderBottom: `2px solid  ${theme.palette.menuLink.active}`,
  },
  menuElLink: {
    margin: `0 ${theme.spacing(2.25)}px`,
    color: theme.palette.menuLink.main,
    textDecoration: "none",
  },
  menuElLinkActive: {
    color: theme.palette.menuLink.active,
  },
}));

export default useStyles;
