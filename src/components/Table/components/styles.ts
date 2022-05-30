import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableActionsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "end",
    "& svg": {
      fill: theme.body.table.actionBar.color,
      width: 16,
      height: 16,
      cursor: "pointer",
      "&:hover": {
        "& > path": {
          stroke: theme.body.table.actionBar.action.iconColor,
        },
      },
    },
    "& svg:last-child": {
      marginLeft: theme.direction === "ltr" ? `${theme.spacing(2)}px` : 0,
      marginRight: theme.direction === "ltr" ? 0 : `${theme.spacing(2)}px`,
    },
  },
  tableActionTrash: {
    "&>path": {
      fill: theme.palette.table.iconDisabled,
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
  hidden: {
    "&>svg": { visibility: "hidden" },
  },
  disabledButton: {
    cursor: "default !important",
    "& svg": {
      cursor: "default !important",
      "& path": {
        stroke: theme.body.table.actionBar.disabled.color,
      },
    },
    "&:hover": {
      "& svg": {
        "& path": {
          stroke: theme.body.table.actionBar.disabled.colorHover,
        },
      },
    },
  },
  editButton: {
    "& svg": {
      fill: "none !important",
    },
  },
  trashButton: {
    fill: "none !important",
  },
}));

export const useTableHeadStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableHeadActionsRowStyle: {
    background: "#DDE7FF",
    textTransform: "uppercase",
    fontWeight: 450,
  },
  tableHeadActionRow: {
    textAlign: "end",
    paddingRight: `${theme.direction === "ltr" ? 30 : 0}px !important`,
    paddingLeft: `${theme.direction === "ltr" ? 0 : 30}px !important`,
  },
  tableHeadCheckboxRow: {
    textAlign: "end",
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
    backgroundColor: theme.body.table.header.imageBackground,
    "&:hover": {
      backgroundColor: theme.body.table.header.active.background,
    },
    "&:active": {
      backgroundColor: theme.body.table.header.active.backgroundSelected,
      "& svg": {
        fill: theme.body.table.header.active.imageColor,
      },
    },
    "& svg": {
      fill: theme.body.table.header.imageColor,
      margin: "0 auto",
      height: 16,
      width: 16,
      "&:hover": {
        stroke: theme.body.table.button.backgroundAdd,
      },
      "&:active": {
        stroke: theme.body.table.button.backgroundAdd,
      },
    },
  },
  tableSortWrapperIsSorted: {
    "&:hover": {
      backgroundColor: theme.body.table.header.active.backgroundSelected,
    },
    backgroundColor: theme.body.table.header.active.backgroundSelected,
    "& svg": {
      fill: theme.body.table.header.imageColorWhite,
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
    opacity: 0.3,
    backgroundColor: theme.palette.primary.background,
    pointerEvents: "none",
  },
  tableCellOverflow: {
    maxWidth: 210,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export const useToolbarStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableToolbarWrapper: {
    display: "flex",
    alignItems: "center",
    background: theme.body.table.header.background,
    height: 70,
    borderRadius: "10px 10px 0 0",
    borderColor: theme.palette.table.border,
    borderStyle: "solid",
    borderWidth: "1px 1px 0 1px",
    color: theme.body.table.title,

    "& button:last-child": {
      background: theme.body.table.button.backgroundAdd,
      color: theme.body.table.button.textAdd,
      "&:hover": {
        color: theme.body.table.button.action.textAdd,
        background: `${theme.body.table.button.action.backgroundAdd} !important`,
        border: `1px solid ${theme.body.table.button.action.borderColor}`,
        "& svg": {
          "& path": {
            fill: theme.body.table.button.action.icon,
          },
        },
      },
      "&:active": {
        background: theme.body.table.button.action.clickBackgroundAdd,
      },
      "& svg": {
        fill: "transparent ",
        display: "block",
        "& path": {
          fill: "transparent",
        },
      },
    },
    "& button": {
      background: theme.body.table.button.backgroundDelete,
      color: theme.body.table.button.text,
      border: `1px solid ${theme.body.table.button.borderColor}`,
      width: 84,
      height: 38,

      "& svg": {
        fill: "transparent ",
        display: "none",
        "& path": {
          fill: "transparent",
        },
      },
      "&:active": {
        border: theme.body.table.button.action.clickBackgroundAdd,
        color: theme.body.table.button.action.clickBackgroundAdd,
      },
      "&:hover": {
        color: theme.body.table.button.action.text,
        background: `${theme.body.table.button.action.background} !important`,
        border: `1px solid ${theme.body.table.button.action.borderColor}`,
        "& svg": {
          "& path": {
            fill: theme.body.table.button.action.icon,
          },
        },
      },
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
    justifyContent: "space-between",
    width: "100%",
    "& >div:first-child": {
      height: "100%",
    },
    height: "calc(100% + 2px)",
  },
  tableToolbarButtonsWrapper: {
    margin: `${theme.spacing(2)}px ${theme.spacing(0.25)}px`,
    paddingRight: theme.spacing(2.5),
    gap: 25,
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
      height: 60,
      background: theme.body.table.pagination.background,
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
      fontWeight: theme.body.table.pagination.fontWeight,
      fontSize: theme.body.table.pagination.fontSize,
      color: theme.body.table.pagination.textColor,
    },
    tablePaginationPageNumber: {
      fontWeight: theme.body.table.pagination.fontWeight,
      fontSize: theme.body.table.pagination.fontSize,
      color: theme.body.table.pagination.textColor,
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
      border: `1px solid ${theme.body.table.pagination.dropDownBorder}`,
      "&:hover": {
        "& fieldset": {
          border: "1px solid transparent !important",
        },
      },
      "& fieldset": {
        border: "1px solid transparent",
      },
      "& input": {
        height: "100%",
      },
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
    tablePaginationNavigateWrapper: {
      display: "flex",
      gap: 8,
    },
    tablePaginationNavigate: {
      height: 28,
      width: 28,
      border: `1px solid ${theme.body.table.pagination.navigateBorder}`,
      borderRadius: 5,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "& svg": {
        height: 10,
        width: 10,
        fill: theme.body.table.pagination.active.activeIcon,
      },
      "&:hover": {
        background: theme.body.table.pagination.active.navigateBackground,
        "& svg": {
          fill: theme.body.table.pagination.active.hoverIcon,
        },
      },
    },
    tablePaginationNavigateDisabled: {
      cursor: "default",
      "& svg": {
        fill: theme.palette.table.iconDisabled,
      },
      "&:hover": {
        background: "transparent",
        "& svg": {
          fill: theme.palette.table.iconDisabled,
        },
      },
    },
  }),
);
