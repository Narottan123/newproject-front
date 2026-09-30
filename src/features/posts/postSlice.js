import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "./postAPI";

const extractError = (err, fallback) => {
  return (
    err.response?.data?.message ||
    err.response?.data ||
    err.message ||
    fallback
  );
};

// CREATE
export const createPost = createAsyncThunk(
  "posts/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.createPostAPI(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err, "Failed to create post"));
    }
  },
);

// GET ALL
export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.getPostsAPI();
      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err, "Failed to fetch posts"));
    }
  },
);

// GET ONE
export const fetchSinglePost = createAsyncThunk(
  "posts/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.getSinglePostAPI(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err, "Failed to fetch post"));
    }
  },
);

// UPDATE
export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.updatePostAPI(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err, "Failed to update post"));
    }
  },
);

// DELETE
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.deletePostAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(extractError(err, "Failed to delete post"));
    }
  },
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    singlePost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSinglePost: (state) => {
      state.singlePost = null;
    },
    clearPostError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const list = action.payload?.data !== undefined ? action.payload.data : action.payload;
        state.posts = Array.isArray(list) ? list : [];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SINGLE
      .addCase(fetchSinglePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.loading = false;
        const post = action.payload?.data !== undefined ? action.payload.data : action.payload;
        state.singlePost = post;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singlePost = null;
      })

      // CREATE
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        const newPost = action.payload?.data !== undefined ? action.payload.data : action.payload;
        if (newPost && newPost._id) {
          state.posts.unshift(newPost);
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload?.data !== undefined ? action.payload.data : action.payload;
        if (updated && updated._id) {
          state.posts = state.posts.map((p) => (p._id === updated._id ? updated : p));
          if (state.singlePost && state.singlePost._id === updated._id) {
            state.singlePost = updated;
          }
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.posts = state.posts.filter((p) => p._id !== deletedId);
        if (state.singlePost && state.singlePost._id === deletedId) {
          state.singlePost = null;
        }
      });
  },
});

export const { clearSinglePost, clearPostError } = postSlice.actions;
export default postSlice.reducer;
