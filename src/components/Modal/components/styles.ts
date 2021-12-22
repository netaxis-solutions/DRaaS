import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const modalHeaderUseStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    modalHeaderWrapper: {
      "& svg": {
        width: 7,
        height: 12,
        fill: theme.palette.primary.main,
      },
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.primary.white,
      boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
    },
    modalHeaderTitle: {
      fontSize: "2rem",
      margin: `0 ${theme.spacing(1.75)}px`,
    },
    modalHeaderTitleWrapper: {
      display: "flex",
      alignItems: "center",
      padding: `${theme.spacing(3.75)}px`,
    },
  }),
);

export const modalContentUseStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    modalContentWrapper: {
      padding: `${theme.spacing(1.25)}px ${theme.spacing(3.75)}px`,
      fontSize: "1.4rem",
    },
  }),
);

export const modalButtonsWrapperUseStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    modalButtonsWrapper: {
      display: "flex",
      gap: theme.spacing(1.25),
      width: "fit-content",
      position: "fixed",

      top: "70px",
      right: theme.direction === "ltr" ? "30px" : "unset",
      left: theme.direction === "ltr" ? "unset" : "30px",
      zIndex: 10,

      "& .MuiButton-label": {
        marginTop: theme.spacing(0.25),
      },
    },
    cancelButton: {
      "&& svg": {
        width: 10,
        height: 10,
      },
    },
  }),
);
