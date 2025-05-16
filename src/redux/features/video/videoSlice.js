import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchVideoUrl = createAsyncThunk("video/fetchVideoUrl", async (filename, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/media`, {
      params: { filename },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { filename, url: response.data.url };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videos: {}, // stores URLs by filename
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoUrl.fulfilled, (state, action) => {
        const { filename, url } = action.payload;
        state.videos[filename] = url;
        state.loading = false;
      })
      .addCase(fetchVideoUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default videoSlice.reducer;
