import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const { setCurrentPage, setItemsPerPage, setTotalItems } =
  paginationSlice.actions;
export default paginationSlice.reducer;
