import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  fixedBackground: {
    position: "fixed",
    left: 0,
    right: 0,
  },
  rightSideModal: {
    margin: 0,
    position: "fixed",
    top: 0,
    bottom: 0,
    width: 464,
    right: 0,
    zIndex: 1000,
    background: theme.body.general.backgrounds.white,
    overflowY: "auto",
    borderRadius: "10px 0 0 10px",
    boxShadow: "-6px 0px 20px rgba(54, 100, 247, 0.15)",
    transform: "translateX(464px)",
    transition: (props: { animationDuration: number }) =>
      `transform ${props.animationDuration}ms linear`,
  },
  modalCloseHandler: {
    margin: 0,
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    overflowY: "auto",
    borderRadius: "10px 0 0 10px",
  },
  modalIsVisible: {
    transform: "translateX(0)",
    transition: (props: { animationDuration: number }) =>
      `transform ${props.animationDuration}ms linear`,
  },
}));

export default useStyles;
