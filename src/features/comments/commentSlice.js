import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./commentAPI";

const extractError = (err, fallback) => {
  return (
    err.response?.data?.message ||
    err.response?.data ||
    err.message ||
    fallback
  );
};

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await API.getCommentsAPI(postId);
      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err, "Failed to fetch comments"));
    }
  },
);

export const addComment = createAsyncThunk(
  "comments/add",
  async ({ postId, data }, { rejectWithValue }) => {
    try {
      const res = await API.addCommentAPI(postId, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err, "Failed to add comment"));
    }
  },
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const list = action.payload?.data !== undefined ? action.payload.data : action.payload;
        state.comments = Array.isArray(list) ? list : [];
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        const newComment = action.payload?.data !== undefined ? action.payload.data : action.payload;
        if (newComment && newComment._id) {
          state.comments.unshift(newComment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
