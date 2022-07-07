import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  modal: {
    margin: 0,
    position: "fixed",
    top: 52,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: theme.modal.background,
    overflowY: "auto",
  },
  fixedBackground: {
    position: "fixed",
    left: 0,
    right: 0,
  },
  modalWithSideBar: {
    margin: 0,
    position: "fixed",
    top: 52,
    bottom: 0,
    left: 220,
    width: "calc(100% - 200px)",
    right: 0,
    zIndex: 0,
    background: theme.body.general.backgrounds.white,
    overflowY: "auto",
  },
}));

export default useStyles;
