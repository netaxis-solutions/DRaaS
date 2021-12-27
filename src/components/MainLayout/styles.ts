import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  mainContentContainer: {
    display: "flex",
    height: "calc(100% - 40px)",
    "& > div": {
      position: "relative",
      "& > div": {
        height: "auto !important",
      },
    },
    "& > div:last-child": {
      position: "initial !important",
    },
  },
  containerWithSidebar: {
    "& > div:last-child > div": {
      width: "calc(100% - 235px) !important",
    },
  },
}));

export default useStyles;
