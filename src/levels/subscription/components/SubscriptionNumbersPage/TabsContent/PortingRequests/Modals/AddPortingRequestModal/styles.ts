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
    color: theme.palette.primary.text,
    fontSize: "1.8rem",
    lineHeight: "2.1rem",
    marginBottom: 14,
  },
  countryDescription: {
    maxWidth: 400,
    color: theme.palette.secondary.text,
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    marginBottom: 24,
  },
}));

export const detailsStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  sectionTitle: {
    color: theme.palette.primary.text,
    fontSize: "1.8rem",
    marginBottom: 14,
  },
  sectionDescription: {
    color: theme.palette.secondary.text,
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
    color: theme.palette.secondary.text,
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
    color: theme.palette.secondary.text,
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
    display: "flex",
    alignItems: "center",
    gap: 5,
    color: theme.palette.status.error,
  },
}));
