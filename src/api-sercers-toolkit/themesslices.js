import { createSlice } from "@reduxjs/toolkit";

const ThemesSlices = createSlice({
  name: "themes/slices",
  initialState: {
    currentTheme: "default",
    colors: {
      red: {
        backgroundColor: "#EBC8B3",
        color: "#070707",
      },
      green: {
        backgroundColor: "#4A7766",
        color: "#070707",
      },
      yellow: {
        backgroundColor: "#AFAFDA",
        color: "#070707",
      },
      dark: {
        backgroundColor: "#2c3e50",
        color: "#070707",
      },
      default: {
        background: "#34495e",
        color: "#070707",
      },
    },
  },
  reducers: {
    radTheme: (state) => {
      state.currentTheme = "red";
    },
    greenTheme: (state) => {
      state.currentTheme = "green";
    },
    yellowTheme: (state) => {
      state.currentTheme = "yellow";
    },
    darkTheme: (state) => {
      state.currentTheme = "dark";
    },
  },
});

export const { radTheme, greenTheme, yellowTheme, darkTheme } =
  ThemesSlices.actions;

export default ThemesSlices.reducer;
