import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";
export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableRoot: {
    border: `1px solid ${theme.body.table.bodyBorder}`,
    background: theme.body.table.background,

    "& a": {
      color: theme.body.table.link,
    },

    "& td": {
      color: theme.body.table.text,
    },

    "& tr": {
      height: theme.body.table.rowHeight,
    },

    "& tbody tr td": {
      borderBottom: theme.body.table.rowBorder,
    },

    "& tbody tr:hover": {
      background: theme.body.table.action.rowBackground,
    },

    "& thead th": {
      borderBottom: `1px solid ${theme.body.table.header.borderBottom}`,
    },

    "& thead  tr th:first-child": {
      paddingLeft: 30,
      textAlign: "start !important",
    },
    "& thead  tr th": {
      color: theme.body.table.header.text,
    },

    "& tbody tr td:first-child": {
      paddingLeft: 30,
      textAlign: "start !important",
    },
  },
  tableBody: {
    boxShadow: "0px 10px 15px 0px #4975E51A",
    borderRadius: 10,
  },
  tableTitle: {
    color: theme.body.table.title,
    fontWeight: theme.body.table.fontWeight,
    fontSize: theme.body.table.fontSize,
    lineHeight: "3rem",
    textTransform: theme.body.table.textTransform,
    fontVariant: "small-caps slashed-zero",
    display: "block",
    marginBottom: "20px",
    marginLeft: theme.spacing(0.5),
  },
  cardBasedTableTitle: {
    marginBottom: 0,
  },
  actionsHeader: {
    textAlign: "end",
  },
  textSkeletonTable: {
    textTransform: theme.body.table.textTransform,
    fontWeight: theme.body.table.fontWeight,
    color: theme.body.table.title,
  },
  textSkeletonTableWithIcon: {
    display: "flex",
    gap: 10,
    justifyContent: "start",
    alignItems: "center",
    color: theme.body.table.title,
    textTransform: theme.body.table.textTransform,
    fontVariant: "small-caps slashed-zero",
    height: theme.body.table.rowHeight,
  },
  checkboxSkeletonCell: {
    width: 70,
    paddingLeft: 30,
    paddingRight: 16,
  },
  actionsHeaderSkeletonCell: {
    width: "21%",
    textAlign: "right",
    color: theme.body.table.title,
    textTransform: theme.body.table.textTransform,
    fontVariant: "small-caps slashed-zero",
    fontWeight: 450,
  },
  bodySkeletonCell: {
    border: "none",
    height: theme.body.table.rowHeight,
  },
  actionsBodySkeletonCell: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  action: {
    marginLeft: 10,
  },
  footerSkeletonCell: {
    height: 40,
    display: "flex",
    width: "100%",
  },
  footerSkeletonCellBlock: {
    width: "33%",
  },
  tableToolbarWrapper: {
    display: "flex",
    alignItems: "center",
    height: 52,
    width: "100%",
  },
  tableToolbarTitle: {
    marginLeft: `${theme.spacing(0.5)}px`,
    width: "50%",
    color: theme.body.table.title,
    fontWeight: theme.body.table.fontWeight,
    fontSize: theme.body.table.fontSize,
    textTransform: theme.body.table.textTransform,
    fontVariant: "small-caps slashed-zero",
    display: "block",
    marginBottom: "20px",
  },
  tableToolbarSkeleton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  loaderWrapper: { display: "flex", justifyContent: "center" },
}));
