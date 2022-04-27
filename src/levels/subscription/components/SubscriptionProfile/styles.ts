import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useProfileStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  greenLabel: {
    color: theme.palette.primary.white,
    background: theme.palette.status.success,
    width: "100%",
  },
  redLabel: {
    color: theme.palette.status.error,
    background: theme.palette.secondary.alertBackground,
  },
  subscriptionName: {
    fontSize: "2.2rem",
    lineHeight: "2.5rem",
    fontWeight: 400,
    color: theme.palette.primary.text,
    marginBottom: 6,
  },
  subscriptionLevel: {
    fontSize: "1.6rem",
    lineHeight: "1.8rem",
    fontWeight: 400,
    color: theme.palette.primary.text,
    marginBottom: 12,
  },
  labelContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
    maxHeight: 22,
    "& >*": {
      borderRadius: 6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  profileHeaderWrapper: {
    marginBottom: 30,
  },
}));
