import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import filterReducer from "./slices/filterSlice";

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
