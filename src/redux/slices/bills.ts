import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bill } from "../../@types/bill";
import { billDetailsDefaultValue } from "../../utils/constants.ts";

const billsSlice = createSlice({
  name: "bills",
  initialState: {
    bill: billDetailsDefaultValue,
  },
  reducers: {
    setBill: (state, action: PayloadAction<Bill>) => {
      state.bill = action.payload;
    },
  },
});

export const { setBill } = billsSlice.actions;
export const billsReducer = billsSlice.reducer;
