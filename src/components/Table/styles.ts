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

    "& tbody tr td": {
      borderBottom: theme.body.table.rowBorder,
    },

    "& tbody tr:hover": {
      background: theme.body.table.action.rowBackground,
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
    textTransform: theme.body.table.textTransform,
    display: "block",
    marginBottom: "20px",
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
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSkeletonCell: {
    width: 70,
    paddingLeft: 30,
    paddingRight: 16,
  },
  actionsHeaderSkeletonCell: {
    width: "21%",
    textAlign: "right",
    textTransform: "uppercase",
  },
  bodySkeletonCell: {
    border: "none",
    height: 54,
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
    marginLeft: `${theme.spacing(3.75)}px`,
    width: "50%",
    color: theme.body.table.title,
    fontWeight: theme.body.table.fontWeight,
    fontSize: theme.body.table.fontSize,
    textTransform: theme.body.table.textTransform,
    display: "block",
    marginBottom: "20px",
  },
  tableToolbarSkeleton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));
