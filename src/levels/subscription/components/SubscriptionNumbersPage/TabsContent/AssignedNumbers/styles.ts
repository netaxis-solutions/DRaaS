import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(2.5),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(5)}px 0`,
    minWidth: "32%",
    maxWidth: "32%",
    flexGrow: 1,
    height: 167,
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: `1px solid ${theme.palette.primary.light}`,
    textAlign: "center",
    "&>*": {
      maxWidth: 295,
    },
  },
  noNumberText: {
    fontWeight: 300,
    fontSize: "1.6rem",
    lineHeight: "1.8rem",
    textAlign: "center",
    color: theme.palette.primary.text,
    marginBottom: theme.spacing(3.75),
  },
  link: {
    color: theme.palette.primary.link,
    textDecoration: "none",
  },
  cardText: {
    fontWeight: 300,
    fontSize: "1.6rem",
    lineHeight: "1.8rem",
    textAlign: "center",
    color: theme.palette.primary.text,
    width: 295,
  },
}));
