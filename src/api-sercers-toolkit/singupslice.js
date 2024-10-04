import { createSlice } from "@reduxjs/toolkit";

const SignUpSlice = createSlice({
  name: "SignUpSlice",
  initialState: {
    singUpLoading: false,
  },
  reducers: {
    SingUPHandler: (state, action) => {
      state.singUpLoading = action.payload; 
    }
  }
});

export const { SingUPHandler } = SignUpSlice.actions;
export default SignUpSlice.reducer;
