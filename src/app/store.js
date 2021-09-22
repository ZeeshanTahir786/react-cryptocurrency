import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { cryptoApi } from "../services/cryptoApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
});
