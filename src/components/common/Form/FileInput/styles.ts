import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  fileCard: {
    display: "flex",
    padding: "15px 30px",
    flexDirection: "column",
    gap: 10,
    maxWidth: 485,
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: 10,
  },
  fileCardHeader: {
    fontSize: "1.8rem",
    lineHeight: "2.1rem",
    color: theme.palette.primary.text,
  },
  fileCardDescription: {
    fontSize: "1.4rem",
    lineHeight: "1.5rem",
    color: theme.palette.secondary.text,
  },
  fileCardState: {
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
  },
  errorState: {
    color: theme.palette.status.error,
  },
  successState: {
    color: theme.palette.primary.link,
  },
  input: { display: "none" },
  uploadButton: {
    alignSelf: "flex-end",
    cursor: "pointer",
    color: theme.palette.secondary.text,
    "& svg": { fill: theme.palette.secondary.text, height: 12, width: 12 },
  },
  notInitiatedState: {
    display: "none",
  },
}));
