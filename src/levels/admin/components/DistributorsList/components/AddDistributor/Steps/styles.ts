import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const createDistributorStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    createDistributorForm: {
      display: "flex",
      flexDirection: "column",
    },
    createDistributorInput: {
      margin: `${theme.spacing(2.5)}px 0`,
      maxWidth: 400,
      "& svg": {
        fill: theme.palette.icon.main,
        stroke: theme.palette.icon.main,
      },
    },
    createDistributorBillingInput: {
      marginBottom: 0,
    },
    createDistributorBillingHelper: {
      fontSize: "1.2rem",
      margin: `${theme.spacing(0.5)}px ${theme.spacing(2.5)}px`,
      color: theme.palette.secondary.text,
    },
  }),
);

export const addAdminStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  addAdminForm: {
    display: "flex",
  },
  addAdminInput: {
    margin: `${theme.spacing(2.5)}px 0`,
    maxWidth: 400,
  },
  addAdminFormPart: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "& > label": {
      margin: `${theme.spacing(3)}px 0`,
    },
  },
  addAdminFormPartTitle: {
    fontSize: "1.8rem",
    fontWeight: 300,
    paddingTop: `${theme.spacing(1.25)}px`,
  },
}));
