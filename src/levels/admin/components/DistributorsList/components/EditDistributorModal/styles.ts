import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useEditDistributorStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  idField: {
    fontSize: "1.6rem",
    lineHeight: "2rem",
    fontWeight: 400,
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2.5),
  },
  idText: { color: "#323D69", marginRight: theme.spacing(2) },
  idValue: { color: "#374151" },
}));

export default useEditDistributorStyles;
