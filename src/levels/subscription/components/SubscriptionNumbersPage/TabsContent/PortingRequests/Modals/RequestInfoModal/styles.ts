import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const requestModalStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tooltipIcon: {
    height: 20,
    width: 20,
    fill: theme.palette.status.error,
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.625),
  },
  activateButton: {
    background: theme.palette.status.success,
    color: theme.body.general.textStyle.white,
    border: "none",
  },
  cancelButton: {
    background: theme.palette.status.error,
    color: theme.body.general.textStyle.white,
    border: "none",

    "&>* svg": {
      fill: `${theme.body.general.icons.whiteFill}!important`,
    },
  },
  buttonsWrapper: {
    position: "fixed",
    display: "flex",
    gap: theme.spacing(1.25),
    zIndex: 1001,
    top: 70,
    right: 30,
  },
}));

export const requestInfoStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  portingDetails: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.25),
    border: `1px solid ${theme.body.general.borders.light}`,
    boxSizing: "border-box",
    borderRadius: "10px",
    width: 456,
    padding: `${theme.spacing(2)}px ${theme.spacing(3.75)}px`,
    marginBottom: theme.spacing(2.5),
    fontWeight: 300,
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    color: theme.body.general.textStyle.black,
  },
  fieldWrapper: {
    display: "flex",
    gap: theme.spacing(1.25),
  },
  fieldName: {
    display: "inline-block",
    width: 113,
  },
  greyTime: {
    color: theme.body.general.textStyle.brown,
  },
}));

export const documentsStyles = makeStyles(() => ({
  cardsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
}));
