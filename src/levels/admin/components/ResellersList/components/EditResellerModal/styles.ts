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
    color: theme.side_bar.distributor.editModal.idLabel,
    marginRight: theme.spacing(2),
  },
  idValue: { color: theme.side_bar.distributor.editModal.idValue },
  skeletonsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

export default useEditDistributorStyles;
