import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const GetPosts = createAsyncThunk("posts/get", async (_, ThunkAPI) => {
  const { rejectWithValue } = ThunkAPI;
  try {
    const res = await axios.get(`${import.meta.env?.VITE_SERVER_URL}/posts`);
    if (res.status >= 400) {
      throw Error("failed to get posts.");
    }
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
export const InsertPost = createAsyncThunk(
  "posts/insert",
  async (args, ThunkAPI) => {
    const { rejectWithValue, dispatch, getState } = ThunkAPI;
    try {
      const DATE = new Date();
      const GET_DAY = DATE.getDate();
      const MONTH_INDEX = DATE.getMonth();
      const MONTH_SHORT = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const GET_YEAR = DATE.getFullYear();
      const GET_MONTH = MONTH_SHORT[MONTH_INDEX];
      args.date = { year: GET_YEAR, month: GET_MONTH, day: GET_DAY };
      const userData = JSON.parse(localStorage.getItem("userData"));
      const username = userData.email.split("@")[0];
      args.username = username;
      dispatch(PostSlice.actions.resetCreateStatus());
      const res = await axios.post(
        `${import.meta.env?.VITE_SERVER_URL}/posts`,
        args
      );
      if (res.status >= 400) {
        throw Error("failed to post data (posts)");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const GetSinglePost = createAsyncThunk(
  "posts/getsingle",
  async (ID, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/posts/${ID}`
      );
      if (res.status >= 400) {
        throw Error("Failed to get the post");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  posts: [],
  isLoading: false,
  error: {},
  createStatus: "pending",
  SPost: {},
  isSPost: false,
};

export const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetCreateStatus: (state, action) => {
      state.createStatus = "pending";
    },
  },
  extraReducers: (builder) => {
    // Get Posts
    builder.addCase(GetPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(GetPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(GetPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    // Insert Post
    builder.addCase(InsertPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(InsertPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createStatus = "fulfilled";
    });
    builder.addCase(InsertPost.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.createStatus = "rejected";
    });
    // Get Single Post
    builder.addCase(GetSinglePost.pending, (state, action) => {
      state.isSPost = true;
    });
    builder.addCase(GetSinglePost.fulfilled, (state, action) => {
      state.SPost = action.payload;
      state.isSPost = false;
    });
    builder.addCase(GetSinglePost.rejected, (state, action) => {
      state.isSPost = false;
    });
  },
});

export default PostSlice.reducer;
