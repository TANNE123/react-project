import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
  name: "FavoriteSlice",
  initialState: {
    cards: [null],
    profileClose:false,
  },

  reducers: {
    profileClose:(state,action)=>{
      return {profileClose:action.payload}
    },
    addFavorite: (state, action) => {
      const urlExists = state.cards.find(url => url === action.payload);
      if (!urlExists) {
        state.cards.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.cards = state.cards.filter(url => url !== action.payload);
    }
  },
});

export const { addFavorite, removeFavorite,profileClose } = FavoriteSlice.actions;

export default FavoriteSlice.reducer;
