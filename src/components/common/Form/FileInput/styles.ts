import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  fileCard: {
    display: "flex",
    padding: `${theme.spacing(1.875)}px ${theme.spacing(3.75)}px`,
    flexDirection: "column",
    gap: theme.spacing(1.25),
    maxWidth: 485,
    boxSizing: "border-box",
    border: `1px solid ${theme.body.general.borders.lights}`,
    borderRadius: 10,
  },
  fileCardHeader: {
    fontSize: "1.8rem",
    lineHeight: "2.1rem",
    color: theme.body.general.textStyle.brown,
  },
  fileCardDescription: {
    fontSize: "1.4rem",
    lineHeight: "1.5rem",
    color: theme.body.general.textStyle.steel,
  },
  fileCardState: {
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
  },
  errorState: {
    color: theme.palette.status.error,
  },
  successState: {
    color: theme.body.general.textStyle.link,
  },
  input: { display: "none" },
  uploadButton: {
    alignSelf: "flex-end",
    cursor: "pointer",
    color: theme.body.general.textStyle.steel,
    "& svg": { fill: theme.body.general.borders.steel, height: 12, width: 12 },
  },
  notInitiatedState: {
    display: "none",
  },
  fileNameBlock: {
    display: "flex",
    gap: theme.spacing(1.25),
  },
  unattachFileButton: {
    background: theme.palette.status.error,
  },
  crossWrapper: {
    "& button": {
      height: 14,
      width: 12,
      "&:active": {
        background: "transparent",
        transform: "scale(90%)",
      },
    },
    "& path": {
      fill: "red",
      height: 14,
    },
  },
}));
