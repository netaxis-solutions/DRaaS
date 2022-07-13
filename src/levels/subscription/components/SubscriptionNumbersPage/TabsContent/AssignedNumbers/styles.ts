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
    border: `1px solid ${theme.body.general.borders.light}`,
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
    color: theme.body.general.textStyle.black,
    marginBottom: theme.spacing(3.75),
  },
  link: {
    color: theme.body.general.textStyle.link,
    textDecoration: "none",
  },
  cardText: {
    fontWeight: 300,
    fontSize: "1.6rem",
    lineHeight: "1.8rem",
    textAlign: "center",
    color: theme.body.general.textStyle.black,
    width: 295,
  },
  tooltipIcon: {
    position: "absolute",
    height: 20,
    right: "-15%",
    width: 20,
    fill: theme.palette.status.alert,
  },
  countryCodeWrapper: {
    display: "flex",
    gap: theme.spacing(1),
    "&>:first-child": {
      minWidth: 40,
    },
  },
}));
