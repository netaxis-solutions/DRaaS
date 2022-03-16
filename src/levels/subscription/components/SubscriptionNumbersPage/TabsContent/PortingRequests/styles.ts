import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  greyTime: {
    color: theme.palette.secondary.text,
  },
  multipleNumbers: {
    cursor: "pointer",
  },
  modalLink: {
    cursor: "pointer",
    color: theme.palette.primary.newLink,
  },
}));

export const tabsStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tooltipIcon: {
    height: 20,
    width: 20,
    fill: theme.palette.status.error,
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.625),
  },
}));

export const requestInfoStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  portingDetails: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.25),
    border: `1px solid ${theme.palette.primary.light}`,
    boxSizing: "border-box",
    borderRadius: "10px",
    width: 456,
    padding: `${theme.spacing(2)}px ${theme.spacing(3.75)}px`,
    marginBottom: theme.spacing(2.5),
    fontWeight: 300,
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    color: theme.palette.primary.text,
  },
  fieldWrapper: {
    display: "flex",
    gap: theme.spacing(1.25),
  },
  fieldName: {
    display: "inline-block",
    width: 113,
  },
  greyTime: {
    color: theme.palette.secondary.text,
  },
}));
