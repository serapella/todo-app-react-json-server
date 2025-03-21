import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import filterReducer from "./slices/filterSlice";
import paginationReducer from "./slices/paginationSlice";
import { todoApi } from "./api/todoApi";

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    filter: filterReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;