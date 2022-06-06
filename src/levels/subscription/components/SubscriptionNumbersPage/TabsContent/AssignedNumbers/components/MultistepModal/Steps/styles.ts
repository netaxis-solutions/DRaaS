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
      border: `1px solid ${theme.body.general.borders.light}`,
      boxSizing: "border-box",
      borderRadius: "10px",
      width: 456,
      padding: `${theme.spacing(2)}px ${theme.spacing(3.75)}px`,
      marginBottom: theme.spacing(2.5),
      fontWeight: 300,
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      color: theme.body.general.textStyle.black,
    },
    fieldWrapper: {
      display: "flex",
      gap: theme.spacing(1.25),
    },
    modalWrapper: {
      zIndex: 500,
    },

    modalButtonWrapper: {
      zIndex: 501,
    },
    fieldName: {
      display: "inline-block",
      width: 113,
    },
  }),
);

export const useProgressBarStyles = makeStyles(
  (theme: ThemeDefaultOptions) => ({
    progressBar: {
      background:
        "linear-gradient(90deg, #8DB338 0%, #FF8800 50.02%, #E60000 100%);",
      borderRadius: 2,
      "& > div": {
        background: theme.body.general.backgrounds.progressBar,
        transform: (props: { percentOfUnavailable: number }) =>
          `translateX(${100 - props.percentOfUnavailable}%) !important`,
      },
    },
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
    tooltipIcon: {
      position: "absolute",
      height: 20,
      width: 20,
      top: 118,
      left: 452,
      fill: theme.body.tooltip.numbers_rangeSize,
    },
    rangeSettingsForm: {
      display: "flex",
      gap: theme.spacing(2.5),
      flexDirection: "column",
      maxWidth: 415,
    },
    textWithInput: {
      display: "flex",
      "& > span": {
        width: 330,
        height: 30,
      },
    },
    text: {
      width: "100%",
    },
    boldText: {
      fontWeight: "bold",
    },
    grayText: {
      color: theme.body.general.textStyle.brown,
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
