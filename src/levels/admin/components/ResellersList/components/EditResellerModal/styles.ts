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
    color: theme.body.table.distributor.edit.editModalBody.idTextColor,
    marginRight: theme.spacing(2),
  },
  idValue: {
    color: theme.body.table.distributor.edit.editModalBody.idValueColor,
  },
  skeletonsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  formWrapper: { marginBottom: 36 },
  redirectBlockWrapper: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: `1px solid ${theme.body.table.distributor.edit.editModalBody.redirectBlock.borderTopColor}`,
    boxSizing: "border-box",
    padding: `${theme.spacing(2)}px 0`,
  },
  redirectLabel: {
    fontSize: "1.6rem",
    lineHeight: "2rem",
    color:
      theme.body.table.distributor.edit.editModalBody.redirectBlock
        .redirectLabelColor,
    marginRight: 8,
  },
  redirectValue: {
    fontSize: "1.6rem",
    lineHeight: "2rem",
    color:
      theme.body.table.distributor.edit.editModalBody.redirectBlock
        .redirectValueColor,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  redirectArrow: {
    height: 16,
    fill:
      theme.body.table.distributor.edit.editModalBody.redirectBlock
        .redirectArrowFill,
    "&:hover": {
      cursor: "pointer",
      fill:
        theme.body.table.distributor.edit.editModalBody.redirectBlock
          .redirectArrowHoverFill,
    },
  },
}));

export default useEditDistributorStyles;
