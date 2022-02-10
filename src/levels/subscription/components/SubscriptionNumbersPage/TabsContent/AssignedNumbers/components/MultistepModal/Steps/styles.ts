import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const styles = makeStyles((theme: ThemeDefaultOptions) => ({
  limitCell: {
    color: theme.palette.status.alert,
  },
}));

export const useEntitlementCardStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    entitlementCard: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1.25),
      border: `1px solid ${theme.palette.primary.light}`,
      boxSizing: "border-box",
      borderRadius: "10px",
      width: 456,
      padding: `${theme.spacing(2)}px ${theme.spacing(3.75)}px`,
      marginBottom: theme.spacing(2.5),
      fontWeight: 300,
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      color: theme.palette.primary.text,
    },
    fieldWrapper: {
      display: "flex",
      gap: theme.spacing(1.25),
    },
    fieldName: {
      display: "inline-block",
      width: 113,
    },
    fieldValue: {},
  }),
);

export const useRangeSettingsStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    input: {
      width: 88,
      "&>*": {
        height: 34,
        marginBottom: 0,
        "&>input": {
          height: 14,
          padding: `${theme.spacing(1.25)}px ${theme.spacing(
            2.5,
          )}px ${theme.spacing(1.25)}px`,
        },
      },
    },
    rangeSettingsForm: {
      display: "flex",
      gap: theme.spacing(2.5),
      flexDirection: "column",
      maxWidth: 411,
    },
    textWithInput: {
      display: "flex",
    },
    text: {
      width: "100%",
    },
    boldText: {
      fontWeight: "bold",
    },
    subscriptText: {
      fontSize: "1.2rem",
      lineHeight: "1.4rem",
      color: theme.palette.secondary.text,
    },
    grayText: {
      color: theme.palette.secondary.text,
    },
  }),
);

export const useRangeSelectionStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    warningText: {
      color: theme.palette.status.alert,
    },
    infoText: {
      marginBottom: 10,
    },
  }),
);
