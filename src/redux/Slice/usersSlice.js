import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Sync Thunks
export const GetUsers = createAsyncThunk(
  "users/get",
  async (args, ThunkAPI) => {
    const { rejectWithValue, dispatch } = ThunkAPI;
    try {
      dispatch(userSlice.actions.resetLoginStatus());
      const res = await axios.get(`${import.meta.env?.VITE_SERVER_URL}/users`);
      if (res.status >= 400) {
        throw Error("Failed to get data");
      }

      return { data: res.data, args: args };
    } catch (error) {
      return rejectWithValue("Network Error, Please try again");
    }
  }
);
export const CreatesUsers = createAsyncThunk(
  "users/create",
  async (args, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env?.VITE_SERVER_URL}/users`,
        args
      );
      if (res.status >= 400) {
        throw Error("Failed to post data");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const EditUser = createAsyncThunk(
  "users/edit",
  async (args, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/users/${args.id}`,
        args
      );
      if (res.status >= 400) {
        throw Error("Failed to edit user");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Main Slice
const initialState = {
  data: [],
  isLoading: false,
  error: { status: false, message: {} },
  completed: "pending",
  isLoginCompleted: "pending",
  userData: null,
  isUserEdit: "pending",
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetLoginStatus: (state, action) => {
      state.isLoginCompleted = initialState.isLoginCompleted;
    },
    currentUser: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builer) => {
    {
      // Get Users
      builer.addCase(GetUsers.pending, (state, action) => {
        state.isLoading = true;
      });
      builer.addCase(GetUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        if (action.payload.args) {
          state.isLoginCompleted = "fulfilled";
        } else if (action.payload.args === false) {
          state.isLoginCompleted = "rejected";
        }
      });
      builer.addCase(GetUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload;
        state.isLoginCompleted = "rejected";
      });
      // Post Users
      builer.addCase(CreatesUsers.pending, (state, action) => {
        state.isLoading = true;
      });
      builer.addCase(CreatesUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.completed = "fulfilled";
      });
      builer.addCase(CreatesUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error.status = true;
        state.error.message = action.payload;
        state.completed = "rejected";
      });
    }
    // Edit User
    builer.addCase(EditUser.pending, (state, action) => {
      state.isUserEdit = "pending";
    });
    builer.addCase(EditUser.fulfilled, (state, action) => {
      state.isUserEdit = "fulfilled";
    });
    builer.addCase(EditUser.rejected, (state, action) => {
      state.isUserEdit = "rejected";
    });
  },
});
export default userSlice.reducer;
export const { resetValues, currentUser } = userSlice.actions;
