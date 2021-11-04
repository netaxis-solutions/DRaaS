import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableActionsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    "& svg": {
      fill: theme.palette.secondary.icon,
      width: 16,
      height: 16,
      cursor: "pointer"
    },
    "& svg:last-child": {
      marginLeft: theme.direction === "ltr" ? `${theme.spacing(2)}px` : 0,
      marginRight: theme.direction === "ltr" ? 0 : `${theme.spacing(2)}px`
    }
  }
}));

export const useTableHeadStyles = makeStyles(() => ({
  tableHeadActionRow: {
    textAlign: "end"
  }
}));

export const useTableSortStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableSortWrapper: {
    width: 28,
    height: 28,
    margin: `0 ${theme.spacing(0.25)}px`,
    borderRadius: 6,
    "&:hover": {
      backgroundColor: theme.palette.secondary.hover
    },
    "&:active": {
      backgroundColor: theme.palette.primary.main,
      "& svg": {
        fill: "#FFFFFF"
      }
    },
    "& svg": {
      fill: theme.palette.secondary.icon,
      margin: "0 auto",
      height: 14,
      width: 10
    }
  },
  tableSortWrapperIsSorted: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    },
    backgroundColor: theme.palette.primary.main,
    "& svg": {
      fill: "#FFFFFF"
    }
  }
}));

export const useTableBodyStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  hover: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.hover
    }
  }
}));
