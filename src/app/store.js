import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";
import commentReducer from "../features/comments/commentSlice";
import uiReducer from "../features/ui/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    comments: commentReducer,
    ui: uiReducer,
  },
});

export default store;
