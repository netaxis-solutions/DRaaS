import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const createSubscriptionStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    createSubscriptionForm: {
      display: "flex",
      flexDirection: "column",
    },
    createSubscriptionInput: {
      maxWidth: 400,
      "& svg": {
        fill: theme.palette.icon.main,
        stroke: theme.palette.icon.main,
      },
    },
    createSubscriptionBillingInput: {
      marginBottom: 0,
    },
    createSubscriptionBillingHelper: {
      fontSize: "1.2rem",
      margin: `${theme.spacing(0.5)}px ${theme.spacing(2.5)}px`,
      color: theme.body.general.textStyle.brown,
    },
  }),
);
