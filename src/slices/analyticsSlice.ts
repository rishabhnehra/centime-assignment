import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "../types/data";
import { getAnalytics } from "../services/getAnalytice";

const initialState: Data[] = [];

export const getAnalyticsData = createAsyncThunk("analytics-api", async () =>
  getAnalytics(),
);

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Data>) => {
      state.push({ ...action.payload, id: state.length + 1 });
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((d) => d.id !== action.payload);
    },
    update: (state, action: PayloadAction<Data>) => {
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAnalyticsData.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const { add, remove, update } = analyticsSlice.actions;

export default analyticsSlice.reducer;
