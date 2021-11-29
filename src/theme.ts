import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#5a4846",
      light: "#797b7b",
      dark: "#414141",
    },
    secondary: {
      main: "#4e4e4e",
      light: "#717171",
      dark: "#4E4E4E",
      contrastText: "#eae9e9",
    },
    background: {
      default: "#fafafa",
    },
    text: {
      primary: "rgba(20,20,20,0.87)",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#626262",
      light: "#4a4a4a",
      dark: "#252525",
    },
    secondary: {
      main: "#606060",
      light: "#101010",
      dark: "#000000",
    },
    divider: "rgba(243,241,241,0.12)",
    background: {
      paper: "#252525",
      default: "#2b2b2b",
    },
    text: {
      secondary: "rgba(220,217,217,0.7)",
      primary: "#eaeaea",
      disabled: "rgba(218,214,214,0.5)",
    },
  },
});
