import { Theme } from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { SpacingOptions } from "@material-ui/core/styles/createSpacing";

import { AnyKeyStringValueObjectType as ColorType } from "utils/types/common";

export type PaletteDefaultOptionsType = PaletteOptions & {
  primary: ColorType;
  secondary: ColorType;
  status: ColorType;
  input: ColorType;
  link: ColorType;
  button: ColorType;
  table: ColorType;
  notification: ColorType;
  icon: ColorType;
};

export type ThemeDefaultOptions = Theme & {
  palette: PaletteDefaultOptionsType;
  spacing: SpacingOptions | ((num: number) => number);
};

export type DeepCloneThemeType = (
  defaultPalette: PaletteDefaultOptionsType,
  palette: PaletteOptions,
) => PaletteOptions;
