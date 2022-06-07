import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  profileBox: {
    display: "flex",
    flexDirection: "column",
  },
  boxHeader: {
    color: theme.body.general.textStyle.black,
    fontStyle: "normal",
    fontWeight: 300,
    fontSize: "1.8rem",
    lineHeight: "2.1rem",
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
