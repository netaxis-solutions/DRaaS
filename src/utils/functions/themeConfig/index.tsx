import get from "lodash/get";
import {
  PaletteDefaultOptionsType,
  ThemeDefaultOptionsType,
  DeepCloneThemeType,
} from "utils/types/themeConfig";

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
