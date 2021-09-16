import { PaletteOptions } from '@material-ui/core/styles/createPalette';

import { AnyKeyStringValueObjectType as ColorType } from 'utils/types/common';

export type PaletteDefaultOptionsType = PaletteOptions & {
  primary: ColorType;
  secondary: ColorType;
  status: ColorType;
  input: ColorType;
};

export type DeepCloneThemeType = (
  defaultPalette: PaletteDefaultOptionsType,
  palette: PaletteOptions
) => PaletteOptions;
