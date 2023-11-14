import { billsApi } from "./apis/bills.ts";
import { invoicesApi } from "./apis/invoice.ts";
import { configureStore } from "@reduxjs/toolkit";
import { billsReducer } from "./slices/bills.ts";
import { invoicesReducer } from "./slices/invices.ts";

export const store = configureStore({
  reducer: {
    bills: billsReducer,
    invoices: invoicesReducer,
    [billsApi.reducerPath]: billsApi.reducer,
    [invoicesApi.reducerPath]: invoicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(billsApi.middleware)
      .concat(invoicesApi.middleware),
});
