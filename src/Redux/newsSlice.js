import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "../api";

export const getNewsListFunction = createAsyncThunk(
  "getNewsListFunction",
  async ({ token }, { dispatch }) => {
    const response = await fetch(API.posts.newsList, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const list = await response.json();
    if (list) {
      dispatch(getNewsListReducer(list));
    } else {
      toast.error("Ошибка при получении данных");
    }
  }
);

export const getTagsListFunction = createAsyncThunk(
  "getTagsListFunction",
  async ({ token }, { dispatch }) => {
    const response = await fetch(API.posts.tagList, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const list = await response.json();
    if (list) {
      dispatch(getTagsListReducer(list));
    }
  }
);

export const getSingleNewFunction = createAsyncThunk(
  "getSingleNewFunction",
  async ({ token, id }, { dispatch }) => {
    const response = await fetch(`${API.posts.newsList}${id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const list = await response.json();
    if (list) {
      dispatch(getSingleNewReducer(list));
    }
  }
);

export const getMyLikeListFunction = createAsyncThunk(
  "getMyLikeListFunction",
  async ({ token, id }, { dispatch }) => {
    const response = await fetch(API.posts.likeList, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const list = await response.json();
    if (list) {
      dispatch(getMyLikeListReducer(list));
    }
  }
);

const initialState = {
  newsList: [],
  tagsList: [],
  singleNew: {
    author: "",
    comment: [],
    id: "",
    image: "",
    is_liked: false,
    short_desc: "",
    tag: "",
    text: "",
    title: "",
  },
  likeList: [],
};
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getNewsListReducer: (state, action) => {
      state.newsList = action.payload;
    },
    getTagsListReducer: (state, action) => {
      state.tagsList = action.payload;
    },
    getSingleNewReducer: (state, action) => {
      state.singleNew = action.payload;
    },
    getMyLikeListReducer: (state, action) => {
      state.likeList = action.payload;
    },
  },
});
export const { getNewsListReducer, getTagsListReducer, getSingleNewReducer, getMyLikeListReducer } =
  newsSlice.actions;
export default newsSlice.reducer;
