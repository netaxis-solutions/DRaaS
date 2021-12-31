import { createStyles } from "@material-ui/core";

export const tabStyles = createStyles(() => ({
  textColorInherit: {
    // color: theme.palette.textBasic.main,
    opacity: 1,
  },
  selected: {
    "&$textColorInherit": {
      //color: theme.palette.link.main,
    },
  },
}));

export default createStyles(() => ({
  root: {
    margin: "0 0 20px",
    boxShadow: "none",
    borderBottom: "1px solid #D8D8D8",
    // [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    //   margin: "0 16px 20px",
    //   width: "initial",
    // },
  },
}));
