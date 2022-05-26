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
      minHeight: 88,
      backgroundColor: theme.palette.primary.white,
      zIndex: 1000,
      "&::after": {
        content: "''",
        display: "block",
        marginLeft: 3,
        width: "calc(100% - 3px)",
        height: 1,
        background: "#DDE7FF",
      },
    },
    modalHeaderTitle: {
      fontSize: "2.4rem",
      color: "#323D69",
      margin: `0 ${theme.spacing(1.75)}px`,
    },
    modalHeaderTitleWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `${theme.spacing(3.75)}px`,
    },
  }),
);

export const modalFooterUseStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    modalFooterWrapper: {
      position: "absolute",
      width: "100%",
      bottom: 0,

      backgroundColor: theme.palette.primary.white,
      zIndex: 1000,
    },
    modalButtonsWrapper: {
      display: "flex",
      gap: 15,
      "&>button": {
        height: 36,
        width: 100,
      },
    },
    bottomLine: {
      display: "block",
      width: "100%",
      height: 1,
      background: "#DDE7FF",
    },
    modalFooterContent: {
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(4),
    },
    modalCancelButton: {
      background: theme.palette.primary.white,
      color: "#67748E",
    },
    modalSaveButton: {}, //this className may be needed in future
    buttonHidden: {
      display: "none",
    },
  }),
);

export const modalContentUseStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    modalContentWrapper: {
      padding: `${theme.spacing(2.5)}px ${theme.spacing(4)}px`,
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
      top: (props: { top?: string | number }) => props.top || 70,
      right: theme.direction === "ltr" ? "30px" : "unset",
      left: theme.direction === "ltr" ? "unset" : "30px",
      zIndex: 1001,

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
    styleCancel: {
      color: `${theme.body.button.cancel.text} !important`,
      background: `${theme.body.button.cancel.background} !important`,
      border: `${theme.body.button.cancel.border} !important`,
      "& svg": {
        "& path": {
          fill: `${theme.body.button.cancel.icon.color} !important`,
        },
      },
    },
  }),
);
