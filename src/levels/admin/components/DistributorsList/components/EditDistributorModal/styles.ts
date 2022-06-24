import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useEditDistributorStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  idField: {
    fontSize: "1.6rem",
    lineHeight: "2rem",
    fontWeight: 400,
    marginBottom: theme.spacing(3),
  },
  idText: {
    color: "#323D69",
    marginRight: theme.spacing(2),
  },
  idValue: { color: "#374151" },
  skeletonsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

export default useEditDistributorStyles;
