import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import xpReducer from "./features/xp/XpSlice";
import storiesReducer from "./features/Story/StorySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    xp: xpReducer,
    stories: storiesReducer,
  },
});
