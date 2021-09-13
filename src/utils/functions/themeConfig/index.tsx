import get from "lodash/get";
import merge from "lodash/merge";
import {
  createTheme as createMuiTheme,
  ThemeOptions,
} from "@material-ui/core/styles";

import {
  PaletteDefaultOptionsType,
  ThemeDefaultOptionsType,
  DeepCloneThemeType,
} from "utils/types/themeConfig";
import { defaultPalette, overrides } from "utils/constants/theme.assets";

export const deepClone: DeepCloneThemeType = (
  defaultPalette: PaletteDefaultOptionsType,
  palette: ThemeDefaultOptionsType
) =>
  Object.keys(defaultPalette).reduce((prev: object, key: string) => {
    if (
      typeof defaultPalette[key as keyof PaletteDefaultOptionsType] === "object"
    ) {
      return {
        ...prev,
        [key]: {
          ...defaultPalette[key as keyof PaletteDefaultOptionsType],
          ...get(palette, key, {}),
        },
      };
    }
    return palette[key as keyof ThemeDefaultOptionsType]
      ? { ...prev, [key]: palette[key as keyof ThemeDefaultOptionsType] }
      : {
          ...prev,
          [key]: defaultPalette[key as keyof PaletteDefaultOptionsType],
        };
  }, {});

export const createTheme = (
  options: ThemeOptions | undefined,
  defaultTheme: ThemeOptions | undefined
) => {
  const direction = document.body.dir || "ltr";
  const palette: any = get(options, "palette", defaultPalette);
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
    palette: deepClone(defaultPalette, palette),
    overrides,
  });
  return createMuiTheme(palette ? themeObj : defaultTheme);
};
