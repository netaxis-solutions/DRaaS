import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  sidebarContainer: {
    height: "100%",
    width: 235,
    borderLeft: `15px solid ${theme.palette.sidebar.tenant}`,
    boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.1)",
    padding: `${theme.spacing(3.75)}px ${theme.spacing(1.875)}px 0 0`,
    position: "relative",
  },
  titleContainer: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(3.75),
    color: theme.palette.primary.text,
    display: "flex",
  },
  iconContainer: {
    minWidth: 45,
    height: 45,
    border: `1px solid ${theme.palette.icon.hover}`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing(1.875),
  },
  title: {
    marginBottom: theme.spacing(1),
    fontSize: "2rem",
    lineHeight: "23px",
    fontWeight: 400,
  },
  level: {
    fontWeight: 300,
    fontSize: "1.4rem",
    lineHeight: "16px",
    "&:first-letter": {
      textTransform: "capitalize",
    },
  },
  sidebarItem: {
    fontWeight: 300,
    padding: `${theme.spacing(1.25)}px 0 ${theme.spacing(
      1.25,
    )}px ${theme.spacing(2.5)}px`,
    display: "block",
    textDecoration: "none",
    color: theme.palette.primary.text,
    border: "solid 2px transparent",
    "&:hover": {
      borderBottom: `solid 2px ${theme.palette.sidebar.tenant}`,
    },
  },
  chosen: {
    fontSize: "1.6rem",
    fontWeight: 400,
    border: `solid 2px ${theme.palette.sidebar.tenant}`,
    borderRadius: 5,
    borderLeft: "none",
    paddingLeft: theme.spacing(3),
    marginLeft: -theme.spacing(0.5),
  },
}));

export default useStyles;
