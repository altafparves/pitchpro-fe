import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import xpReducer from "./features/xp/XpSlice";
import storiesReducer from "./features/Story/StorySlice";
import pretestReducer from "./features/Pretest/preTestSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    xp: xpReducer,
    stories: storiesReducer,
    pretest: pretestReducer,
  },
});
