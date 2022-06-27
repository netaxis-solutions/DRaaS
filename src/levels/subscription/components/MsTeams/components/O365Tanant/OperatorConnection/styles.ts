import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const OperatorConnectionStyle = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    textWithIcon: {
      display: "flex",
      justifyContent: "start",
      gap: theme.spacing(1.5),
      "& div": {
        width: 20,
        height: 20,
      },
      "& svg": {
        width: 20,
        height: 20,
      },
    },
    boldText: {
      fontWeight: 700,
    },
    shortCodeTextWrapper: {
      marginTop: 24,
      maxWidth: 450,
    },
    shortCodeForm: {
      display: "flex",
      gap: theme.spacing(2.5),
      alignItems: "center",
    },
    ulListStatusPage: {
      listStyleType: "none",
      paddingLeft: 34,
      marginTop: 12,
      "& li": {
        marginTop: 12,
      },
    },
    helperTextWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),
    },
    textWithIconList: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
      "& svg": {
        "& path": {
          stroke: "#FF8800",
        },
      },
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "end",
    },
    radioGroupWrapper: {
      maxWidth: 420,
      marginTop: 16,
    },
    field: {
      width: 400,
    },
    shortCodeField: {
      width: 400,
      marginTop: 16,
    },
    radioButtom: {
      "&.MuiRadio-root:hover": {
        backgroundColor: "transparent",
      },
      "&.MuiSvgIcon-root": {
        border: `1px solid ${theme.palette.icon.active}`,
        borderRadius: "50%",
        fill: `#fff`,
      },
    },
    radioChecked: {
      borderRadius: "50%",
      fill: `${theme.palette.icon.active}`,
    },
    formLabel: {
      "& span:first-child": {
        marginBottom: theme.spacing(1.5),
        height: 40,
        "&:hover": {
          background: "transparent",
        },
      },
    },
    cancelButton: {
      background: theme.body.general.backgrounds.white,
      color: theme.rightSideModal.cancelButtonText,
      marginLeft: 10,
    },
  }),
);
