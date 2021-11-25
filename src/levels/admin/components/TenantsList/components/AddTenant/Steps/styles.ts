import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const createTenantStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  createTenantForm: {
    display: "flex",
    flexDirection: "column",
    "& > div": {
      maxWidth: 400,
    },
  },
  createTenantInput: {
    "& svg": {
      fill: theme.palette.icon.main,
      stroke: theme.palette.icon.main,
    },
  },
  createTenantBillingInput: {
    marginBottom: 0,
  },
  createTenantBillingHelper: {
    fontSize: "1.2rem",
    margin: `${theme.spacing(0.5)}px ${theme.spacing(2.5)}px`,
    color: theme.palette.secondary.text,
  },
}));
