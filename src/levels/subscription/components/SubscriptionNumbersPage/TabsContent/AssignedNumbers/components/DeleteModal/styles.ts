import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  text: {
    fontSize: "1.4rem",
    fontWeight: 300,
    marginBottom: theme.spacing(3.75),
    maxHeight: 250,
    overflow: "auto",
  },
  boldText: {
    fontWeight: 400,
    overflowWrap: "anywhere",
  },
  textWithInput: {
    marginBottom: theme.spacing(1.875),
  },
}));

export default useStyles;
