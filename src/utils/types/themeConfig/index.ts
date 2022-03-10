import { Theme } from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { SpacingOptions } from "@material-ui/core/styles/createSpacing";

import { AnyKeyStringValueObjectType as ColorType } from "utils/types/common";

export type PaletteDefaultOptionsType = PaletteOptions & {
  primary: ColorType;
  secondary: ColorType;
  status: ColorType;
  input: ColorType;
  menuLink: ColorType;
  button: ColorType;
  table: ColorType;
  notification: ColorType;
  icon: ColorType;
  sidebar: ColorType;
};

export type TThemeBody = {
  background: string;
  fontFamily: string;
  button: { [key: string]: string | { [key: string]: string } };
  table: { [key: string]: string | { [key: string]: string } };
  tabs: { [key: string]: string | { [key: string]: string } };
  card: { [key: string]: string | { [key: string]: string } };
  stepper: { [key: string]: string | { [key: string]: string } };
};

export type ThemeDefaultOptions = Theme & {
  palette: PaletteDefaultOptionsType;
  spacing: SpacingOptions | ((num: number) => number);
  body: TThemeBody;
  top_bar: { [key: string]: string };
  side_bar: { [key: string]: string };
};

export type DeepCloneThemeType = (
  defaultPalette: PaletteDefaultOptionsType,
  palette: PaletteOptions,
) => PaletteOptions;
