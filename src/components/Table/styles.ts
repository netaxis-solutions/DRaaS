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
  actionsHeader: {
    textAlign: "end",
  },
}));
