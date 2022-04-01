import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  emptyTableWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    "& span": {
      fontSize: "1.6rem",
      lineHeight: "18px",
    },
  },
}));
