import { alpha, PaletteMode } from "@mui/material/styles";

const brand = {
  50: "#F0F7FF",
  100: "#CEE5FD",
  200: "#9CCCFC",
  300: "#6BB0F7",
  400: "#3A91F0",
  500: "#667eea",
  600: "#5864E6",
  700: "#4A50D9",
  800: "#3B3DB8",
  900: "#2D2F97",
};

const gray = {
  50: "#FBFCFE",
  100: "#EAF0F5",
  200: "#D6E2EB",
  300: "#BFCCD9",
  400: "#94A6B8",
  500: "#5B6B7C",
  600: "#4C5967",
  700: "#364049",
  800: "#131B20",
  900: "#090E10",
};

const green = {
  50: "#F6FEF6",
  100: "#E3FBE3",
  200: "#C7F7C7",
  300: "#A1E8A1",
  400: "#51BC51",
  500: "#1F7A1F",
  600: "#136C13",
  700: "#0A470A",
  800: "#042F04",
  900: "#021D02",
};

const orange = {
  50: "#FFF9EB",
  100: "#FFF4DB",
  200: "#FFE8B7",
  300: "#FFD889",
  400: "#FFC35A",
  500: "#FFAA1C",
  600: "#FF9800",
  700: "#CC7A00",
  800: "#995C00",
  900: "#663D00",
};

const red = {
  50: "#FFF0F0",
  100: "#FFDBDB",
  200: "#FFB7B7",
  300: "#FF8E8E",
  400: "#FF6B6B",
  500: "#F44336",
  600: "#D32F2F",
  700: "#B22A2A",
  800: "#8E1F1F",
  900: "#6A1616",
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[700],
      contrastText: brand[50],
      ...(mode === "dark" && {
        contrastText: brand[50],
        light: brand[300],
        main: brand[400],
        dark: brand[800],
      }),
    },
    grey: {
      ...gray,
    },
    error: {
      light: red[300],
      main: red[400],
      dark: red[800],
      ...(mode === "dark" && {
        light: red[400],
        main: red[500],
        dark: red[700],
      }),
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
      ...(mode === "dark" && {
        light: green[400],
        main: green[500],
        dark: green[700],
      }),
    },
    warning: {
      light: orange[300],
      main: orange[400],
      dark: orange[800],
      ...(mode === "dark" && {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      }),
    },
    info: {
      light: brand[100],
      main: brand[300],
      dark: brand[600],
      contrastText: gray[50],
      ...(mode === "dark" && {
        contrastText: brand[300],
        light: brand[500],
        main: brand[700],
        dark: brand[900],
      }),
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      ...(mode === "dark" && {
        primary: "#fff",
        secondary: gray[400],
      }),
    },
    divider: mode === "dark" ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
    background: {
      default: "#fff",
      paper: gray[50],
      ...(mode === "dark" && {
        default: gray[900],
        paper: "rgb(5, 30, 52)",
      }),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(","),
    h1: {
      fontSize: "3.75rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "2.625rem",
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "2.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.125rem",
    },
    subtitle1: {
      fontSize: "1.125rem",
    },
    subtitle2: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.9375rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12,
  },
});
