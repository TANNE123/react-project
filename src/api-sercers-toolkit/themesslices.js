import { createSlice } from "@reduxjs/toolkit";

const ThemesSlices = createSlice({
  name: "themes/slices",
  initialState: {
    currentTheme: "default",
   colors : {
        red: {
          backgroundColor: "#EBC8B3",
          color: "#ff0000",
        },
        green: {
          backgroundColor: "#4A7766",
          color: "#00aa00",
        },
        yellow: {
          backgroundColor: "#AFAFDA",
          color: "#aaaa00",
        },
        dark:{
            backgroundColor:"#2c3e50",
            color :"#aaaa00"
        },
        default: {
          backgroundColor: "#ffffff",
          color: "#000000",
        }
      }
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
    darkTheme:(state)=>{
        state.currentTheme="dark"
    }
  },
});

export const { radTheme, greenTheme, yellowTheme,darkTheme } = ThemesSlices.actions;

export default ThemesSlices.reducer;
