import get from "lodash/get";
import merge from "lodash/merge";
import { createTheme as createMuiTheme } from "@material-ui/core/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { Theme } from "@material-ui/core";

import {
  PaletteDefaultOptionsType,
  DeepCloneThemeType,
  ThemeDefaultOptions,
} from "utils/types/themeConfig";
import { defaultPalette, overrides } from "utils/constants/theme.assets";

export const deepClone: DeepCloneThemeType = (
  defaultPalette: PaletteDefaultOptionsType,
  palette: PaletteOptions,
) =>
  Object.keys(defaultPalette).reduce((prev, key: string) => {
    if (
      typeof defaultPalette[key as keyof PaletteDefaultOptionsType] === "object"
    ) {
      return {
        ...prev,
        [key]: {
          ...(defaultPalette[key as keyof PaletteDefaultOptionsType] as {}),
          ...get(palette, key, {}),
        },
      };
    }
    return palette[key as keyof PaletteOptions]
      ? { ...prev, [key]: palette[key as keyof PaletteOptions] }
      : {
          ...prev,
          [key]: defaultPalette[key as keyof PaletteDefaultOptionsType],
        };
  }, {} as PaletteOptions);

export const createTheme = (
  options: ThemeDefaultOptions | {},
  defaultTheme: ThemeDefaultOptions | Theme,
) => {
  const direction = document.body.dir || "ltr";
  const palette: PaletteDefaultOptionsType = get(
    options,
    "palette",
    defaultPalette,
  );
  const themeObj = merge({}, options, defaultTheme, {
    direction,
    breakpoints: {
      values: {
        xs: 480,
        sm: 768,
        md: 920,
        lg: 1200,
        xl: 1800,
      },
    },
    typography: {
      fontFamily: ['"Font"', '"Roboto"', "sans-serif"].join(","),
      body1: {
        fontFamily: ['"Font"', '"Roboto"', "sans-serif"].join(","),
      },
      body2: {
        fontFamily: ['"Font"', '"Roboto"', "sans-serif"].join(","),
      },
      button: {
        fontFamily: ['"Font"', '"Roboto"', "sans-serif"].join(","),
      },
      caption: {
        fontFamily: ['"Font"', '"Roboto"', "sans-serif"].join(","),
      },
      inherit: {
        fontFamily: ['"Font"', '"Roboto"', "sans-serif"].join(","),
      },
    },
    palette: deepClone(defaultPalette, palette),
    overrides: overrides(palette),
  });
  return createMuiTheme(palette ? themeObj : defaultTheme);
};
