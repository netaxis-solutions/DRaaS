import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";
//@ts-ignore
const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  profileBox: {
    display: "flex",
    flexDirection: "column",
  },
  boxHeader: {
    color: theme.palette.primary.text,
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "18px",
    lineHeight: "21px",
    marginBottom: 27,
  },
  inputField: {
    width: 400,
  },
  form: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 160,
  },
  userProfile: {
    marginBottom: 15,
  },
}));

export default useStyles;
