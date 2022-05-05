import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useAddLocationStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  formWrapper: {
    display: "flex",
    maxWidth: 400,
    gap: theme.spacing(2.5),
    flexDirection: "column",
  },
}));
