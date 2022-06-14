import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const documentsStyles = makeStyles(() => ({
  cardsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
}));

export const countryStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  countrySelect: {
    maxWidth: 400,
  },
  countryHeader: {
    color: theme.body.general.textStyle.black,
    fontSize: "1.8rem",
    lineHeight: "2.1rem",
    marginBottom: 14,
  },
  countryDescription: {
    maxWidth: 400,
    color:theme.body.general.textStyle.brown,
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    marginBottom: 24,
  },
}));

export const detailsStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  sectionTitle: {
    color: theme.body.general.textStyle.black,
    fontSize: "1.8rem",
    marginBottom: 14,
  },
  sectionDescription: {
    color: theme.body.general.textStyle.brown,
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    marginBottom: 15,
    maxWidth: 400,
  },
  inputField: {
    maxWidth: 400,
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
}));

export const numbersStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  numbersTextArea: {
    display: "block",
    resize: "none",
    width: 400,
    height: 240,
    border: `1px solid ${theme.palette.input.border}`,
    borderRadius: 6,
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    color: theme.body.general.textStyle.brown,
    padding: "10px 20px",
  },
  numbersFlex: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
  },
  numbersDescription: {
    fontSize: "1.2rem",
    lineHeight: "1.4rem",
    color:theme.body.general.textStyle.brown,
  },
}));

export const verificationStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tooltipIcon: {
    fill: theme.palette.status.error,
    height: 18,
    width: 18,
  },
  successStatus: { color: theme.palette.status.success },
  failStatus: {
    color: theme.palette.status.error,
  },
}));

export const modalStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  closeIcon: {
    position: "absolute",
    zIndex: 1500,
    top: theme.spacing(-1),
    right: theme.spacing(4),
    padding: 0,
    "& svg": {
      width: 14,
      height: 14,
      fill: theme.palette.icon.main,
    },
  },
}));
