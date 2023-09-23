import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoading: false,
  isError: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInPending: state => {
      state.isLoading = true;
    },
    signInFulfilled: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    signInRejected: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    }
  }
});

export const { signInRejected, signInPending, signInFulfilled } = userSlice.actions;

export default userSlice.reducer;
