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
    light: "#EBEBF7",
    link: "#0061F1",
  },
  secondary: {
    main: "#CCE3D8",
    light: "#EBEBF7",
    text: "#828282",
    icon: "#828282",
    hover: "#F5F7FF",
  },
  status: {
    alert: "#FF8800",
    error: "#EC4436",
    success: "#8BB439",
  },
  input: {
    border: "#B4BDC2",
    disabled: "#D9DDE0",
  },
  menuLink: {
    main: "#212356",
    active: "#484CBA",
  },
  button: {
    hover: "#EBEBF7",
    active: "#C2C3E8",
  },
  table: {
    hover: "#F5F7FF",
    border: "#EBEBF7",
    iconActive: "#484CBA",
    iconDisabled: "#B4BDC2",
  },
  notification: {
    success: "#BDDA84",
    error: "#EC4436",
  },
  icon: {
    hover: "#C2C3E8",
    active: "#484CBA",
    main: "#828282",
  },
  sidebar: {
    distributor: "#D5DCBD",
    reseller: "#93BBCB",
    tenant: "#E0CFD5",
  },
};

export const overrides = (palette: PaletteDefaultOptionsType) => ({
  MuiCssBaseline: {
    "@global": {
      html: {
        fontSize: 10,
        color: palette?.primary?.text,
        fontWeight: 400,
        ...scroll,
        height: "100%",
        "& body": {
          height: "100%",
        },
        "& #root": {
          height: "100%",
        },
      },
    },
  },
  MuiContainer: {
    root: {
      height: "100%",
      padding: "0 !important",
      maxWidth: "100vw !important",
      fontSize: "1.4rem",
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
        color: `${palette.secondary.text} !important`,
      },
    },
    outlined: {
      transform: "translate(20px, 15px) scale(1)",
    },
    shrink: {
      transform: "translate(20px, -4px) scale(0.75) !important",
    },
  },
  MuiTouchRipple: { root: { display: "none" } },
  MuiButton: {
    root: {
      height: 36,
      fontSize: "1.4rem",
      width: "fit-content",
      boxShadow: "none !important",
      "&:hover": {
        backgroundColor: "#F5F7FF !important",
        color: palette.secondary.text,
        "& svg": {
          fill: `${palette.icon.main} !important`,
        },
      },
    },
    contained: {
      backgroundColor: palette.primary.main,
      color: "#FFFFFF",
      borderRadius: 6,
    },
    startIcon: {
      marginLeft: 0,
      marginRight: 4,
      "& svg": {
        fill: "#FFFFFF",
      },
    },
    label: {
      textTransform: "capitalize",
    },
    outlined: {
      borderColor: palette.icon.main,
      color: palette.secondary.text,
      "& svg": {
        fill: `${palette.icon.main} !important`,
      },
    },
  },
  MuiFormControl: {
    root: {
      "& [data-error]:after": {
        margin: "4px 0 0 20px",
        content: "attr(data-error)",
        display: "block",
        position: "absolute",
        top: "100%",
        fontSize: "1.2rem",
        color: `${palette.status.error} !important`,
      },
    },
  },
  MuiOutlinedInput: {
    root: {
      borderRadius: 6,
      "&$focused": {
        "& fieldset": { borderWidth: "1px !important" },
      },
    },
  },
  PrivateNotchedOutline: {
    legendLabelled: {
      marginLeft: 9,
      "& span": {
        paddingLeft: 0,
        paddingRight: 3,
      },
    },
  },
  MuiTableRow: {
    root: {
      "&:hover": {
        backgroundColor: palette.table.hover,
      },
      "&$selected": {
        background: "transparent",
      },
      "& a": {
        color: palette.primary.link,
        textDecoration: "none",
      },
      "& .link": {
        "&:hover": {
          color: palette.menuLink.main,
        },
      },
    },
  },
  MuiTableCell: {
    root: {
      fontSize: "1.4rem",
      "&:last-child": {
        padding: "16px 33px 16px 16px",
      },
      padding: 3,
    },
    head: {
      color: palette.secondary.text,
    },
  },
  MuiTableHead: {
    root: {
      borderBottom: `1px solid ${palette.table.border}`,
    },
  },
  MuiCheckbox: {
    root: {
      color: palette.input.border,
    },
  },
});
