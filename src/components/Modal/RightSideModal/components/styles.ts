import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const modalHeaderUseStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    modalHeaderWrapper: {
      "& svg": {
        width: 7,
        height: 12,
        fill: theme.body.general.icons.blueFill,
      },
      position: "sticky",
      top: 0,
      minHeight: 88,
      backgroundColor: theme.body.general.backgrounds.white,
      zIndex: 1000,
      "&::after": {
        content: "''",
        display: "block",
        marginLeft: 3,
        width: "calc(100% - 3px)",
        height: 1,
        background: theme.rightSideModal.underline,
      },
    },
    modalHeaderTitle: {
      fontSize: "2.4rem",
      color: theme.rightSideModal.title,
      lineHeight: "3rem",
      textTransform: "lowercase",
      fontVariant: "small-caps slashed-zero",
      fontWeight: 750,
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

      backgroundColor: theme.body.general.backgrounds.white,
      zIndex: 1000,
    },
    modalButtonsWrapper: {
      display: "flex",
      gap: theme.spacing(1.875),
      "&>button": {
        height: 36,
        width: 100,
      },
    },
    bottomLine: {
      display: "block",
      width: "100%",
      height: 1,
      background: theme.rightSideModal.underline,
    },
    modalFooterContent: {
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(4),
    },
    modalCancelButton: {
      background: theme.body.general.backgrounds.white,
      color: theme.rightSideModal.cancelButtonText,
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
