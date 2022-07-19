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
        width: 16,
        height: 16,
      },
    },
    boldText: {
      fontWeight: 700,
    },
    boldTextAdminAccount: {
      fontWeight: 750,
      fontSize: "1.6rem",
      lineHeight: "2rem",
    },
    boldTitle: {
      fontWeight: 750,
      color: theme.body.general.textStyle.titleColor,
    },
    disabledText: {
      color: theme.body.general.textStyle.disabledColor,
    },
    textAdminAccount: {
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
    },
    integrationData: {
      textOverflow: "ellipsis ",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: 460,
      color: theme.body.general.textStyle.disabledColor,
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
          stroke: theme.palette.icon.alert,
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
        fill: theme.body.button.normal.icon.color,
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
      background: theme.body.button.cancel.background,
      color: theme.body.button.cancel.text,
      marginLeft: 10,
    },
    userStatusInfoPage: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2.5),
    },
    adminIntegrationWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(3),
    },
    adminIntegrationStatusWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2.5),
      height: "100%",
    },
    adminIntegrationTextWithIcon: {
      display: "flex",
      gap: theme.spacing(1.875),
      "& svg": {
        width: 16,
        height: 16,
      },
    },
    twoStepText: {
      display: "flex",
      flexDirection: "column",
    },
  }),
);
