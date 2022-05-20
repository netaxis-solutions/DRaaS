import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  iconsBarWrapper: {
    margin:
      theme.direction === "ltr"
        ? `0 ${theme.spacing(2.75)}px 0 auto`
        : `0 auto 0 ${theme.spacing(2.75)}px`,
    "& svg": {
      fill: theme.top_bar.icon.color,
      width: 16,
      height: 16,
      margin: `0 ${theme.spacing(1)}px`,
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  profile: {
    "& >.MuiPopover-paper": {
      position: "absolute",
      top: "40px",
      right: "30px",
      width: 188,
      display: "flex",
      fontSize: "1.2rem",
      lineHeight: "1.4rem",
      boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "6px",
      "& >.MuiList-root>:not(:last-child)": {
        borderBottom: `1px solid ${theme.top_bar.userProfile.white}`,
      },
      "& >*": {
        width: "100%",
        "& >*": {
          padding: "8px 20px",
        },
      },
    },
  },
  logOut: {
    color: theme.top_bar.userProfile.statusError,
    fontWeight: 300,
    "&:hover": {
      cursor: "pointer",
    },
  },
  account: {
    color: theme.top_bar.userProfile.accountColor,
    fontWeight: 300,
    "&:hover": {
      cursor: "pointer",
    },
  },
  userName: {
    color: theme.top_bar.userProfile.primaryText,
    fontSize: "1.6rem",
    lineHeight: "1.8rem",
    fontWeight: 300,
  },
  userEntity: {
    color: theme.top_bar.userProfile.secondaryText,
    fontSize: "1.2rem",
    lineHeight: "1.4rem",
    fontWeight: 300,
  },
  userProfile: {
    color: theme.top_bar.userProfile.secondaryText,
    fontSize: "1rem",
    lineHeight: "1.2rem",
    fontWeight: 300,
  },
  languageDropDown: {
    "& .MuiPaper-root": {
      position: "absolute !important",
      left: "calc(100% - 121px) !important",
      top: "5% !important",
      maxWidth: "60px",
    },
  },
  languageBarWrapper: {
    width: 60,
    fontSize: "1.4rem !important",
    textAlign: "center",
    textTransform: "uppercase",
  },
  languageBarItemAction: {
    backgroundColor: `${theme.top_bar.userProfile.white} !important`,
  },
  icons: {
    background: theme.top_bar.icon.background,
    "& path": {
      fill: theme.top_bar.icon.color,
    },
    "&:hover": {
      "& path": {
        fill: theme.top_bar.icon.action.color,
      },
    },
  },
}));

export default useStyles;
