import { PaletteDefaultOptionsType } from "utils/types/themeConfig";

const scroll = {
  "& ::-webkit-scrollbar": {
    width: "10px",
  },

  /* Track */
  "& ::-webkit-scrollbar-track": {
    "-webkit-box-shadow": "inset 0 0 4px rgba(0,0,0,0.3)",
    "-webkit-border-radius": "6px",
    borderRadius: "6px",
  },

  /* Handle */
  "& ::-webkit-scrollbar-thumb": {
    "-webkit-border-radius": "6px",
    borderRadius: "6px",
    background: "rgba(196,196,196,0.6)",
    "-webkit-box-shadow": "inset 0 0 4px rgba(0,0,0,0.3)",
  },
  "& ::-webkit-scrollbar-thumb:window-inactive": {
    background: "rgba(196,196,196,0.2)",
  },
};

export const defaultPalette: PaletteDefaultOptionsType = {
  primary: {
    main: "#484CBA",
    text: "#333333",
    background: "#F9F9F9",
  },
  secondary: {
    main: "#CCE3D8",
    light: "#EBEBF7",
    text: "#828282",
    icon: "#828282",
  },
  status: {
    alert: "#FF8800",
    error: "#EC4436",
    success: "#8BB439",
  },
  input: {
    border: "#B4BDC2",
  },
};

export const overrides = {
  MuiCssBaseline: {
    "@global": {
      html: {
        fontSize: 10,
        color: defaultPalette.primary.text,
        fontWeight: 400,
        ...scroll,
      },
    },
  },
  MuiInputBase: {
    root: {
      height: 40,
    },
  },
  MuiInputLabel: {
    root: {
      "&$disabled": {
        color: `${defaultPalette.secondary.text} !important`,
      },
    },
    outlined: {
      transform: "translate(20px, 15px) scale(1)",
    },
    shrink: {
      transform: "translate(20px, -4px) scale(0.75) !important",
    },
  },
  MuiOutlinedInput: {
    root: {
      borderRadius: 2,
      "&$focused": {
        "& fieldset": { borderWidth: "1px !important" },
      },
    },
    input: {
      padding: "14px 20px 10px",
      fontSize: "1.4rem",
    },
    notchedOutline: {
      borderColor: defaultPalette.input.border,
    },
  },
  PrivateNotchedOutline: {
    legendLabelled: {
      marginLeft: 9,
      "& span": {
        paddingLeft: 0,
        paddingRight: 5,
      },
    },
  },
};
