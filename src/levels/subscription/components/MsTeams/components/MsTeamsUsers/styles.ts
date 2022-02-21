import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";
//@ts-ignore
export default makeStyles((theme: ThemeDefaultOptions) => ({
  button: {
    "&": {
      width: 20,
      height: 20,
      padding: 0,
      "&>*>*": {
        width: "100%",
        height: "100%",
        "&>path": {
          fill: theme.palette.secondary.text,
          width: "100%",
          height: "100%",
        },
      },
    },
  },
  licenses: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(0.5),
    width: "100%",
  },
  width100: {
    width: "90%",
  },
  numberWithLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1.25),
    width: "100%",
  },
  active: { background: theme.palette.status.success },
  error: { background: "#df2231" },
  updating: { background: theme.palette.primary.main },
  label: {
    height: 14,
    width: 50,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.75rem",
    lineHeight: "0.9rem",
    color: theme.palette.primary.white,
    textTransform: "uppercase",
  },
}));
