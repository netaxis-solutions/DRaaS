import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useProfileTabStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  profileWrapper: {
    display: "flex",
    maxWidth: 400,
    gap: theme.spacing(2.5),
    flexDirection: "column",
  },
  warningText: {
    color: theme.palette.status.alert,
  },
  greenLabel: {
    color: theme.palette.primary.white,
    background: theme.palette.status.success,
    width: "100%",
  },
  redLabel: {
    color: theme.palette.status.error,
    background: theme.palette.secondary.alertBackground,
  },
  labelContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
    maxHeight: 22,
    "& >*": {
      borderRadius: 6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  boldLabel: {
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
    fontWeight: 700,
  },
  fieldWithButtonWrapper: {
    display: "flex",
    gap: theme.spacing(1.25),
  },
}));

export const useLocationTableStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    countryCellWrapper: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(0.5),
    },
    selectPostalCode: {
      "&": {
        margin: 0,
        width: 180,
        height: 34,
        "&>*>div": {
          height: 34,
          background: theme.palette.primary.white,
          "&>input": {
            height: "100%",
            position: "absolute",
            top: "0px",
            left: "20px",
            width: "69%!important",
          },
        },
        "&>*>label": {
          top: -4,
        },
      },
    },
    selectController: {
      "&>div": {
        margin: 0,
        height: 46,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    emptyTableWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: theme.spacing(2.5),
      alignItems: "center",
      height: 100,
      "& span": {
        fontSize: "1.6rem",
        lineHeight: "1.8rem",
      },
    },
  }),
);
