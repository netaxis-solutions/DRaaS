import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableActionsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    "& svg": {
      fill: theme.palette.icon.main,
      width: 16,
      height: 16,
      cursor: "pointer",
    },
    "& svg:last-child": {
      marginLeft: theme.direction === "ltr" ? `${theme.spacing(2)}px` : 0,
      marginRight: theme.direction === "ltr" ? 0 : `${theme.spacing(2)}px`,
    },
  },
  iconButton: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&& svg": {
      marginLeft: 0,
    },
  },
}));

export const useTableHeadStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableHeadActionRow: {
    textAlign: "end",
    paddingRight: `${theme.direction === "ltr" ? 30 : 0}px !important`,
    paddingLeft: `${theme.direction === "ltr" ? 0 : 30}px !important`,
  },
  tableHeadCheckboxRow: {
    paddingLeft: theme.direction === "ltr" ? 30 : 0,
    paddingRight: theme.direction === "ltr" ? 0 : 30,
    width: 60,
  },
}));

export const useTableSortStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableSortWrapper: {
    width: 28,
    height: 28,
    margin: `0 ${theme.spacing(0.25)}px`,
    borderRadius: 6,
    "&:hover": {
      backgroundColor: theme.palette.table.hover,
    },
    "&:active": {
      backgroundColor: theme.palette.primary.main,
      "& svg": {
        fill: "#FFFFFF",
      },
    },
    "& svg": {
      fill: theme.palette.icon.main,
      margin: "0 auto",
      height: 14,
      width: 10,
    },
  },
  tableSortWrapperIsSorted: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    backgroundColor: theme.palette.primary.main,
    "& svg": {
      fill: "#FFFFFF",
    },
  },
}));

export const useTableBodyStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableCellWithSelection: {
    paddingLeft: theme.direction === "ltr" ? 30 : 0,
    paddingRight: theme.direction === "ltr" ? 0 : 30,
    width: 60,
  },
  tableCellWithAction: {
    textAlign: "end",
    paddingRight: `${theme.direction === "ltr" ? 30 : 0}px !important`,
    paddingLeft: `${theme.direction === "ltr" ? 0 : 30}px !important`,
  },
  isEditing: {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: theme.palette.primary.background,
    pointerEvents: "none",
  },
}));

export const useToolbarStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableToolbarWrapper: {
    display: "flex",
    alignItems: "center",
    height: 52,
    borderRadius: "10px 10px 0 0",
    borderColor: theme.palette.table.border,
    borderStyle: "solid",
    borderWidth: "1px 1px 0 1px",
    "& button": {
      borderColor: "transparent",
    },
  },
  tableToolbarTitle: {
    fontSize: "2rem",
    margin: `0 ${theme.spacing(3.75)}px`,
    flex: 1,
  },
  tableToolbarSearchActionWrappper: {
    display: "flex",
    alignItems: "center",
    "& >div:first-child": {
      height: "100%",
    },
    height: "calc(100% + 2px)",
  },
  tableToolbarButtonsWrapper: {
    margin: `0 ${theme.spacing(0.25)}px`,
    display: "flex",
    alignItems: "center",
    "& button": {
      margin: `${theme.spacing(0.25)}px`,
    },
  },
}));

export const tablePaginationStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    tablePaginationWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 40,
      borderRadius: "0 0 10px 10px",
      borderColor: theme.palette.table.border,
      borderStyle: "solid",
      borderWidth: "0 1px 1px 1px",
      padding: `0 ${theme.spacing(3.75)}px`,
      color: theme.palette.secondary.text,
    },
    tablePaginationActionsWrapper: {
      display: "flex",
      alignItems: "center",
    },

    tablePaginationLinesPerPageTitle: {
      padding: `0 ${theme.spacing(1)}px`,
    },
    tablePaginationPageNumber: {
      padding:
        theme.direction === "ltr"
          ? `0 ${theme.spacing(1.75)}px 0 ${theme.spacing(2.5)}px`
          : `0 ${theme.spacing(2.5)}px 0 ${theme.spacing(1.75)}px`,
    },
  }),
);

export const paginationDropdownStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    autocompleteRoot: {
      height: 28,
      "& > div": {
        marginTop: "0 !important",
      },
    },
    automcompleteInputRoot: {
      height: 28,
      padding: `${theme.spacing(1)}px ${theme.spacing(1.75)}px !important`,
      fontSize: "1.2rem",
    },
    autocompleteInput: {
      padding: "0 !important",
    },
    autocompleteEndAdornment: {
      top: "inherit !important",
    },
  }),
);

export const paginationNavigationStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    tablePaginationNavigate: {
      height: 28,
      width: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "& svg": {
        height: 12,
        width: 7,
        fill: theme.palette.table.iconActive,
      },
    },
    tablePaginationNavigateDisabled: {
      cursor: "default",
      "& svg": {
        fill: theme.palette.table.iconDisabled,
      },
    },
  }),
);
