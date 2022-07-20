import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableActionsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "end",
    paddingTop: theme.spacing(0.65),
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
    cursor: "default",
    "& svg": {
      cursor: "default",
      "& path": {
        stroke: theme.body.table.actionBar.disabled.color,
        fill: "transparent",
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
      fill: "none",
    },
  },
  trashButton: {
    fill: "none",
  },
}));

export const useTableHeadStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableHeadActionsRowStyle: {
    background: theme.body.table.header.headerBGActionWrap,
    fontSize: theme.body.table.fontSize,
    textTransform: theme.body.table.textTransform,
    fontVariant: "small-caps slashed-zero",
    fontWeight: 450,
    "&.MuiTableHead-root": {
      "&:hover": {
        background: theme.body.table.header.headerBGActionWrap,
      },
    },
  },
  tableHeadActionRow: {
    textAlign: "end",
    textTransform: theme.body.table.textTransform,
    fontVariant: "small-caps slashed-zero",
    fontWeight: 450,
    color: theme.body.table.title,
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
    backgroundColor: theme.body.general.backgrounds.light,
    "&:hover": {
      backgroundColor: theme.body.general.backgrounds.light,
    },
  },
  disabled: {
    opacity: 0.3,
    backgroundColor: theme.body.general.backgrounds.whiteSmoke,
    pointerEvents: "none",
  },
  tableCellOverflow: {
    maxWidth: 210,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableBodyCardsWrapper: {
    maxHeight: "calc((95vh - 187px) )",
    overflowY: "auto",

    "&>*>*": {
      background: "none",
      boxSizing: "border-box",
      display: "flex",
      gap: theme.spacing(1),
      flexDirection: "row",
      flexWrap: "wrap",
      minWidth: "100%",

      "&>div": {
        "@media screen and (min-width:1420px)": {
          width: "calc(25% - 6px)",
        },
        "@media screen and (min-width:1080px) and (max-width:1420px)": {
          width: "calc(33.3% - 5.4px)",
        },

        "@media screen and (min-width:760px) and (max-width:1080px)": {
          width: "calc(50% - 4px)",
        },
        "@media screen and (min-width:400px) and (max-width:760px)": {
          width: "100%",
        },
      },
    },
  },
  loaderWrapper: {
    display: "flex",
    justifyContent: "center",
    "&&": {
      width: "100%",
    },
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
    "& fieldset": {
      border: "1px solid transparent !important",
    },
    "& >div:first-child": {
      height: "100%",
      maxWidth: "600px",
      width: "100%",
    },
    height: "calc(100% + 2px)",
  },
  cardBasedTableToolbarSearchActionWrappper: {
    "&>div:first-child": {
      maxWidth: "400px",
      "& fieldset": {
        border: "none",
        borderBottom: "1px solid #DDE7FF!important",
      },
    },
  },
  tableToolbarButtonsWrapper: {
    margin: `${theme.spacing(2)}px ${theme.spacing(0.25)}px`,
    paddingRight: theme.spacing(2.5),
    gap: theme.spacing(1.975),
    display: "flex",
    alignItems: "center",
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
      margin: `${theme.spacing(0.25)}px`,
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

  cardBasedTableToolbarButtonsWrapper: {
    padding: 0,
  },

  cardBasedTableToolbarWrapper: {
    marginBottom: 6,
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
      color: theme.body.general.textStyle.brown,
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
        marginTop: 0,
      },
    },
    automcompleteInputRoot: {
      height: 28,
      padding: `${theme.spacing(1)}px ${theme.spacing(1.75)}px !important`,
      fontSize: "1.2rem",
      border: `1px solid ${theme.body.table.pagination.dropDownBorder}`,
      "&:hover": {
        "& fieldset": {
          border: "1px solid transparent",
        },
      },
      "& fieldset": {
        border: "1px solid transparent !important",
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
      gap: theme.spacing(1),
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

// tsIgnore used there because default mui theme accept zIndex only as number
// and it cannot be overriden
//@ts-ignore
export const useTableRowStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableRowCard: {
    position: "relative",
    boxSizing: "border-box",
    background: theme.body.table.tableRowCard.background,
    display: "flex",
    minHeight: 168,
    minWidth: 334,
    padding: `${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`,
    flexDirection: "column",
    borderRadius: 4,
    border: `1px solid ${theme.body.table.tableRowCard.borderColor}`,

    "&:hover": {
      border: `1px solid ${theme.body.table.tableRowCard.borderHoverColor}`,
    },
  },
  cellsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.5),
    alignItems: "center",
    "& div": {
      width: "100%",
      textOverflow: "ellipsis ",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textAlign: "center",
    },
  },
  actionsMenuButton: {
    position: "absolute",
    cursor: "pointer",
    top: 24,
    right: 36,
    "& svg": {
      height: 20,
      fill: theme.body.table.tableRowCard.actions.actionsMenuButton.imageFill,
    },
  },
  userAvatar: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 16,
    "& svg": {
      height: 60,
    },
  },
  menuStyles: {
    zIndex: "100!important",
    "&>*>ul>*>*": {
      display: "block",
      textAlign: "center",
      fontSize: "1.4rem",
      lineHeight: "1.7rem",
      color: theme.body.table.tableRowCard.actions.tableActionsWrapper.color,

      "&>*": {
        height: 26,
        display: "flex",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
        padding: `0 ${theme.spacing(2)}px`,
        "&:hover": {
          background:
            theme.body.table.tableRowCard.actions.tableActionsWrapper
              .elementHoverColor,
        },
      },
    },
  },
}));
