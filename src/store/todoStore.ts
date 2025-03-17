export type TodoCategory = {
  id: string;
  name: "Work" | "Personal" | "Other" | "Health" | "Learning" | "Shopping";
  color: string;
};

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
