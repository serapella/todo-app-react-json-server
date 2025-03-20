import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../todoStore";

interface FilterState {
  filter: Category | "All Categories";
  statusFilter: "All Status" | "Completed" | "Active";
}

const initialState: FilterState = {
  filter: "All Categories",
  statusFilter: "All Status",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Category | "All Categories">) => {
      state.filter = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<"All Status" | "Completed" | "Active">,
    ) => {
      state.statusFilter = action.payload;
    },
  },
});

export const { setFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
