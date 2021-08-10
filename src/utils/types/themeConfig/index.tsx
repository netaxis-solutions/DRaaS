import { AnyKeyStringValueObjectType as ColorType } from "utils/types/common";

export type PaletteDefaultOptionsType = {
  primary: ColorType;
  secondary: ColorType;
  link: ColorType;
  userLevelIcon: ColorType;
  mobileUserLevelIcon: ColorType;
};

export type ThemeDefaultOptionsType = {
  palette: PaletteDefaultOptionsType;
};

export type DeepCloneThemeType = (
  defaultPalette: PaletteDefaultOptionsType,
  palette: ThemeDefaultOptionsType
) => object;
