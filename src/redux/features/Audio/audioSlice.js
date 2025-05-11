import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadAudio = createAsyncThunk("audio/uploadAudio", async ({ id, audioBlob,status }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("audio", audioBlob, "recorded_audio.wav");

    const response = await axios.post(`${API_URL}/generate/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    return rejectWithValue(error.response?.data || "Upload failed");
  }
});
  
const audioSlice = createSlice({
  name: "audio",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadAudio.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadAudio.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadAudio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default audioSlice.reducer;
