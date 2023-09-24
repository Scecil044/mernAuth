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
    },
    updatePending: state => {
      state.isLoading = true;
    },
    updateFulfilled: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userInfo = action.payload;
    },
    updateRejected: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    deleteAccountPending: state => {
      state.isLoading = true;
    },
    deleteAccountFulfilled: state => {
      state.userInfo = null;
      state.isLoading = false;
      state.isError = false;
    },
    deleteAccountRejected: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    signOut: state => {
      state.userInfo = null;
      state.isError = false;
      state.isLoading = false;
    }
  }
});

export const {
  signInRejected,
  signInPending,
  signInFulfilled,
  updatePending,
  updateFulfilled,
  updateRejected,
  deleteAccountFulfilled,
  deleteAccountPending,
  deleteAccountRejected,
  signOut
} = userSlice.actions;

export default userSlice.reducer;
