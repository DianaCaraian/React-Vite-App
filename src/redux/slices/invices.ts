import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { invoiceDetailsDefaultValue } from "../../utils/constants.ts";
import { Invoice } from "../../@types/invoice";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoice: invoiceDetailsDefaultValue,
  },
  reducers: {
    setInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoice = action.payload;
    },
  },
});

export const { setInvoice } = invoicesSlice.actions;
export const invoicesReducer = invoicesSlice.reducer;
