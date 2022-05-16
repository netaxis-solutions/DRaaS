import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const createResourceAccountStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    selectNumber: {
      "&": {
        margin: 0,
        maxWidth: 400,
        height: 34,
        "&>*>div": {
          height: 34,
          background: theme.palette.primary.white,
          "& button[aria-label='Clear']": {
            border: "1px solid red",
            display: "none",
          },
          "&>input": {
            height: "100%",
            position: "absolute",
            top: "0px",
            left: "20px",
            width: "69%!important",
          },
        },
        "&>*>label": {
          top: -4,
        },
      },
    },
    selectCountry: {
      maxWidth: 400,
    },
    createResourceAccountForm: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    createSubscriptionForm: {
      display: "flex",
      flexDirection: "column",
    },
    createSubscriptionInput: {
      maxWidth: 400,
      "& div": {
        margin: 0,
      },
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
      color: theme.palette.secondary.text,
    },
    selectController: {
      "&>div": {
        margin: 0,
        height: 46,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    centred: {
      marginLeft: 35,
    },
    assignedNumberWrapper: {
      display: "flex",
      justifyContent: "start",
      alignItem: "center",
      gap: 10,
    },
    assignedNumberButtons: {
      display: "flex",
      justifyContent: "start",
      width: "100%",
      "& div": {
        maxWidth: "90%",
      },
    },
    errorNotification: {
      fill: theme.palette.status.error,
      transform: "rotate(180deg)",
      width: 20,
      height: 20,
    },
    icon: {
      height: 20,
      width: 20,
      "& >svg": {
        width: "100%",
        height: "100%",
        fill: "#000",
      },
    },
  }),
);
