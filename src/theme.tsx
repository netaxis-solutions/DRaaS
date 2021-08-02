import red from "@material-ui/core/colors/red";
import get from "lodash/get";

type Class = {
  [key: string]: string;
};

type DefaultOptions = {
  primary: Class;
  secondary: Class;
  error: Class;
  background: Class;
};

export const deepClone = (defaultPalette: DefaultOptions, palette: object) => {
  return Object.keys(defaultPalette).reduce((prev: object, key: string) => {
    return {
      ...prev,
      [key]: {
        ...defaultPalette[key as keyof DefaultOptions],
        ...get(palette, key, {}),
      },
    };
  }, {});
};

// A custom theme for this app
const theme = {
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
};

let globalOptions = {};

async function getThemeConfig() {
  return await fetch("/branding/default/theme.config.json")
    .then((data) => data.json())
    .then((data) => ({
      ...theme,
      ...data,
      palette: deepClone(theme.palette, get(data, "palette", {})),
    }))
    .catch(() => theme)
    .then(({ palette }) => {
      globalOptions = {
        palette,
      };
      return globalOptions;
    });
}

export default getThemeConfig;
