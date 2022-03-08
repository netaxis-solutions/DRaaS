import { makeStyles } from "@material-ui/core";

import { LoggedInUserType } from "utils/types/routingConfig";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  sidebarContainer: {
    background: (props: { currentLevel: LoggedInUserType }) =>
      theme.side_bar[props.currentLevel].background,
    fontFamily: theme.side_bar.fontFamily,
    height: "100%",
    width: 235,
    borderLeft: (props: { currentLevel: LoggedInUserType }) =>
      `15px solid ${theme.side_bar.accent[props.currentLevel]}`,
    boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.1)",
    padding: `${theme.spacing(3.75)}px ${theme.spacing(1.875)}px 0 0`,
    position: "relative",
    "& > div > div": {
      padding: "0 !important",
      "& div": {
        "& div:first-child": {
          color: (props: { currentLevel: LoggedInUserType }) =>
            theme.side_bar[props.currentLevel].avatar.avatarLabel,
        },
      },
    },
  },
  titleContainer: {
    marginLeft: theme.spacing(1.875),
    marginBottom: theme.spacing(1.875),
    color: (props: { currentLevel: LoggedInUserType }) =>
      theme.side_bar[props.currentLevel].avatar.avatarSubLabel,
    display: "flex",
  },
  titleWithDropdown: {
    marginBottom: theme.spacing(3.75),
    overflow: "hidden",
  },
  titleWrapper: {
    overflow: "hidden",
  },
  iconContainer: {
    minWidth: 45,
    height: 45,
    border: (props: { currentLevel: LoggedInUserType }) =>
      `1px solid ${theme.side_bar[props.currentLevel].avatar.avatarBorder}`,
    background: (props: { currentLevel: LoggedInUserType }) =>
      theme.side_bar[props.currentLevel].avatar.avatarBackground,
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
    textOverflow: "ellipsis",
    overflow: "hidden",
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
    color: (props: { currentLevel: LoggedInUserType }) =>
      theme.side_bar[props.currentLevel].text,
    border: "solid 2px transparent",
    "&:hover": {
      borderBottom: (props: { currentLevel: LoggedInUserType }) =>
        `solid 2px ${theme.side_bar.accent[props.currentLevel]}`,
    },
  },
  chosen: {
    fontSize: "1.6rem",
    fontWeight: 400,
    border: (props: { currentLevel: LoggedInUserType }) =>
      `solid 2px ${theme.side_bar.accent[props.currentLevel]}`,
    borderRadius: 5,
    borderLeft: "none",
    paddingLeft: theme.spacing(3),
    marginLeft: -theme.spacing(0.5),
  },
}));

export default useStyles;
