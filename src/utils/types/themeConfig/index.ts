import { Theme } from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { SpacingOptions } from "@material-ui/core/styles/createSpacing";

import { AnyKeyStringValueObjectType as ColorType } from "utils/types/common";

export type PaletteDefaultOptionsType = PaletteOptions & {
  status: ColorType;
  input: ColorType;
  menuLink: ColorType;
  button: ColorType;
  table: ColorType;
  notification: ColorType;
  icon: ColorType;
  sidebar: ColorType;
  body: any;
};

export type TThemeBody = {
  background: string;
  fontFamily: string;
  button: any;
  table: any;
  tabs: any;
  card: any;
  stepper: any;
  general: any;
};

export type ThemeDefaultOptions = Theme & {
  palette: PaletteDefaultOptionsType;
  spacing: SpacingOptions | ((num: number) => number);
  body: any;
  top_bar: any;
  side_bar: any;
  rightSideModal: any;
  label: any;
};

export type DeepCloneThemeType = (
  defaultPalette: PaletteDefaultOptionsType,
  palette: PaletteOptions,
) => PaletteOptions;
