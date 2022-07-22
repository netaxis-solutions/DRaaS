import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default makeStyles((theme: ThemeDefaultOptions) => ({
  emptyTableWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: theme.body.table.tableRowCard.linkColor,
    textDecoration: "none",
    fontSize: "1.8rem",
    lineHeight: "2.2rem",
    fontWeight: 500,
  },
  billingId: {
    color: theme.body.table.tableRowCard.textColor,
    fontSize: "1.6rem",
    lineHeight: "2rem",
  },
}));
