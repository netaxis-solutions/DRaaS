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
      boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.1)",
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
      width: "fit-content",
      margin:
        theme.direction === "ltr"
          ? `-${theme.spacing(9.5)}px 0 ${theme.spacing(5)}px auto`
          : `-${theme.spacing(9.5)}px auto ${theme.spacing(5)}px 0`,
      "& button:last-of-type": {
        marginLeft: theme.spacing(1.25),
      },
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
