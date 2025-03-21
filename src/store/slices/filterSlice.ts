import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: string;
  statusFilter: "All Status" | "Completed" | "Active";
}

const initialState: FilterState = {
  filter: "All Categories",
  statusFilter: "All Status",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<"All Status" | "Completed" | "Active">
    ) => {
      state.statusFilter = action.payload;
    },
  },
});

export const { setFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;