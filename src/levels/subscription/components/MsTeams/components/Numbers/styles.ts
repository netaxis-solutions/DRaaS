import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  flags: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    "& img": {
      width: "20px !important",
      height: 16,
    },
  },
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
  text: {
    fontSize: "1.4rem",
    fontWeight: 300,
    marginBottom: theme.spacing(3.75),
    maxHeight: 250,
    overflow: "auto",
  },
  boldText: {
    fontWeight: 400,
    overflowWrap: "anywhere",
  },
  textWithInput: {
    marginBottom: theme.spacing(1.875),
  },
}));
