import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useProfileStyles = makeStyles((theme: ThemeDefaultOptions) => ({
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

  profileHeaderWrapper: {
    marginBottom: 30,
  },
}));
