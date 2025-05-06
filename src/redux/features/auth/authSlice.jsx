// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Existing signup thunk
export const signupUser = createAsyncThunk("auth/signupUser", async ({ username, email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// 🆕 New login thunk
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Login failed");
    }

    // Save token to localStorage for persistence
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.datas));

    return { token: data.accessToken, user: data.datas };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const authSlice = createSlice({
  
  name: "auth",
  initialState: {
    user: storedUser ? { user: JSON.parse(storedUser) } : null,
    token: storedToken || null,
    loading: false,
    error: null,
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 🧩 Add loginUser case
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
