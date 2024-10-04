import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState: {
    ProfileChange: "",
  },
  reducers: {
    profileHandler: (state, action) => {
      return { ProfileChange: action.payload };
    },
  },
});

export const { profileHandler } = ProfileSlice.actions;

export default ProfileSlice.reducer;
