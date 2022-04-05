import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  breadcrumbsWrapper: {
    padding: "18px 0 0 30px",
    "& .MuiBreadcrumbs-separator": {
      width: 10,
      height: 10,
    },
    "& svg": {
      "& path": {
        fill: theme.body.breadcrumbs.icon,
      },
    },
    "& a": {
      cursor: "pointer",
      fontSize: "1.4rem",
      color: theme.body.breadcrumbs.text,
      textDecoration: "none",
    },
  },
  disabledLink: {
    cursor: "inherit !important",
    fontSize: "1.4rem",
    color: theme.body.breadcrumbs.text,
    fontWeight: "bold" as "bold",
    textDecoration: "none",
  },
}));

export default useStyles;
