import { makeStyles } from "@material-ui/core";

export const EntitlementsStyle = makeStyles({
  root: {
    display: "flex",
    gap: 10,
    justifyContent: "space-between",
    alignItem: "center",
    maxWidth: 100,
    "& img": {
      width: "20px !important",
      height: 16,
      marginRight: 10,
    },
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
