import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../api";

export const getTokenFunction = createAsyncThunk(
  "token",
  async ({ data, navigate }, { dispatch }) => {
    const response = await fetch(API.users.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    if (response.ok) {
      const result = await response.json();
      localStorage.getItem("token", result.token);
      navigate("/newsPage");
      dispatch(getTokenReducer(result.token));
    } else {
      toast.error("Неправильный никнейм или пароль");
    }
  }
);

const token = localStorage.getItem("token");
const initialState = {
  token: token,
};
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getTokenReducer: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { getTokenReducer } = tokenSlice.actions;
export default tokenSlice.reducer;
