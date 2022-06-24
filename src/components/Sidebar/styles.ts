import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  sidebarContainer: {
    background: theme.side_bar.backgroundColor,
    fontFamily: theme.side_bar.fontFamily,
    minHeight: "calc(100vh - 52px)",
    maxHeight: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 220,
    boxShadow: "6px 0px 20px rgba(54, 100, 247, 0.15)",
    padding: `${theme.spacing(3.75)}px ${theme.spacing(1.875)}px 0 0`,
    position: "relative",
    fontVariant: "small-caps slashed-zero",
    textTransform: "lowercase",
    "& > div > div": {
      padding: "0 !important",
    },
  },
  titleContainer: {
    display: "flex",
    width: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWithDropdown: {
    marginBottom: theme.spacing(3.75),
    overflow: "hidden",
  },
  titleWrapper: {
    overflow: "hidden",
    width: 140,
  },
  iconContainer: {
    minWidth: 40,
    height: 40,
    background: theme.side_bar.iconBackground,
    borderRadius: "50%",
    marginLeft: theme.spacing(2.5),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing(1.875),
    cursor: "pointer",
    "& svg": {
      "& path": {
        fill: theme.side_bar.iconColor,
      },
    },
  },
  title: {
    marginBottom: theme.spacing(1),
    color: theme.side_bar.titleColor,
    fontSize: "2rem",
    lineHeight: "23px",
    fontWeight: 700,
    textOverflow: "ellipsis",
    overflow: "hidden",
    cursor: "pointer",
  },
  level: {
    fontWeight: 300,
    color: "#374151",
    fontSize: "1.4rem",
    lineHeight: "17px",
    width: 120,
  },
  sidebarItem: {
    fontWeight: 450,
    fontSize: "1.6rem",
    padding: `${theme.spacing(1.25)}px 0 ${theme.spacing(
      1.25,
    )}px ${theme.spacing(4.5)}px`,
    display: "block",
    textDecoration: "none",
    color: "#374151",
    textTransform: "lowercase",
    fontVariant: "small-caps slashed-zero",
    "&:hover": {
      width: 220,
      background: theme.side_bar.hoverEffect,
    },
  },
  chosen: {
    fontSize: "1.6rem",
    fontWeight: 450,
    width: 220,
    borderRight: `3px solid${theme.side_bar.activeItem}`,
    borderRadius: 0,
    color: theme.side_bar.activeItemText,
  },
}));

export default useStyles;
