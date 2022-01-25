import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  tableRoot: {
    border: `1px solid ${theme.palette.primary.light}`,
    "& thead  tr th:first-child": {
      paddingLeft: 30,
      textAlign: "start !important",
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
