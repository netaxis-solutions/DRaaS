import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useEditDistributorStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  idField: {
    fontSize: "1.6rem",
    lineHeight: "2rem",
    fontWeight: 400,
    marginBottom: theme.spacing(3),
  },
  idText: { color: "#323D69", marginRight: theme.spacing(2) },
  idValue: { color: "#374151" },
  skeletonsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  formWrapper: { marginBottom: 36 },
  redirectBlockWrapper: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #DDE7FF",
    boxSizing: "border-box",
    padding: `${theme.spacing(2)}px 0`,
  },
  redirectLabel: {
    fontSize: "1.6rem",
    lineHeight: "2rem",
    color: "#323D69",
    marginRight: 8,
  },
  redirectValue: {
    fontSize: "1.6rem",
    lineHeight: "2rem",
    color: "#0061F1",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  redirectArrow: {
    height: 16,
    fill: "#374151",
    "&:hover": {
      cursor: "pointer",
      fill: "#0061F1",
    },
  },
}));

export default useEditDistributorStyles;
