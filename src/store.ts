import { configureStore } from "@reduxjs/toolkit";
import analyticeReducer from "./slices/analyticsSlice";

export const store = configureStore({
  reducer: {
    analytics: analyticeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
