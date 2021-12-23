import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  autocompleteRoot: {
    marginBottom: theme.spacing(1.875),
    "& > div": {
      marginTop: "0 !important",
    },
  },
  automcompleteInputRoot: {
    fontSize: "1.4rem",
    padding: `${theme.spacing(1.75)}px ${theme.spacing(2.5)}px ${theme.spacing(
      1.25,
    )}px !important`,
    "& legend": {
      fontSize: "1.25rem",
    },
  },
  autocompleteInput: {
    padding: "0 !important",
  },
  endAdornment: {
    top: "inherit !important",
    right: `${theme.spacing(2.5)}px !important`,
    "& svg": {
      fill: theme.palette.icon.active,
      stroke: theme.palette.icon.active,
    },
  },
  outlined: {
    fontSize: "1.4rem",
  },

  error: { color: `${theme.palette.status.error} !important` },
  shrink: {
    fontSize: "1.6rem",
    marginTop: -1,
  },
  groupLabel: {
    color: `${theme.palette.secondary.text} !important`,
    fontSize: "1.4rem !important",
    fontWeight: "300 !important" as "bold",
    padding: "0 20px 0 20px !important",
  },
  option: {
    height: theme.spacing(5),
    fontSize: "1.4rem",
    fontWeight: 300,
    padding: "0 20px 0 20px !important",
    color: theme.palette.primary.text,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
    "&[aria-selected='true']": {
      backgroundColor: `${theme.palette.primary.white} !important`,
      color: theme.palette.primary.main,
      fontWeight: 400,
      "&:hover": {
        backgroundColor: `${theme.palette.primary.light} !important`,
      },
    },
  },
  popupIndicator: {
    transform: "none !important",
    "& > svg": {
      fill: theme.palette.icon.active,
      stroke: theme.palette.icon.active,
    },
  },
  errorHelperText: {
    fontSize: "1.2rem",
    margin: "4px 0 0 20px",
    color: theme.palette.status.error,
  },
}));

export default useStyles;
