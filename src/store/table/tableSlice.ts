import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ColumnsResponse } from "../../api/apiTypes";

type TableData = {
  columns: ColumnsResponse | null;
  loading: boolean;
};

const initialState: TableData = {
  columns: null,
  loading: false,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    getColumns: (state, action: PayloadAction<ColumnsResponse>) => {
      state.columns = action.payload;
    },
  },
});

const getTableStore = (state: RootState) => state.table;

export const selectTableColumns = createSelector(getTableStore, (state) => {
  return state.columns;
});

export const selectTableLoading = createSelector(getTableStore, (state) => {
  return state.loading;
});

export const { getColumns } = tableSlice.actions;

export default tableSlice.reducer;
