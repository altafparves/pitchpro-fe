import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import xpReducer from "./features/xp/XpSlice";
import storiesReducer from "./features/Story/StorySlice";
import pretestReducer from "./features/Pretest/preTestSlice";
import audioReducer from "./features/Audio/audioSlice";
import feedbackReducer from "./features/feedback/feedbackSlice";
import profileReducer from "./features/profile/profileSlice";
import posttestReducer from "./features/PostTest/postTestSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    xp: xpReducer,
    stories: storiesReducer,
    pretest: pretestReducer,
    posttest: posttestReducer,
    audio: audioReducer,
    feedback: feedbackReducer,
    profile: profileReducer,
  },
});
