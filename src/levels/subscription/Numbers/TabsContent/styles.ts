import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

//@ts-ignore
export default makeStyles((theme: ThemeDefaultOptions) => ({
  cardsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    padding: "40px 0",
    minWidth: "32%",
    maxWidth: "32%",
    flexGrow: 1,
    height: 167,
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid" + theme.palette.primary.light,
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
    marginBottom: 30,
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
