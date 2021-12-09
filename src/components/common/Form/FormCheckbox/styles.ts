import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    transform: "scale(1.422)",
    "&$checked": {
      color: "red !important",
    },
    "& span:hover": {
      backgroundColor: "none !important",
    },
  },
  label: {
    fontSize: "1.4rem",
  },
}));

export default useStyles;
