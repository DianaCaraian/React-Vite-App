import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/constants.ts";
import { BillListResponse, BillResponse } from "../../@types/bill";

export const billsApi = createApi({
  reducerPath: "billsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const username = import.meta.env.VITE_USERNAME;
      const password = import.meta.env.VITE_PASSWORD;
      const basicAuth = btoa(`${username}:${password}`);
      headers.set("Authorization", `Basic ${basicAuth}`);
    },
  }),
  tagTypes: ["Bill"],
  endpoints: (builder) => ({
    getBills: builder.query<
      BillListResponse,
      { page: number; rowsPerPage: number }
    >({
      query: ({ page, rowsPerPage }) =>
        `?search=type:bill&page=${page + 1}&limit=${rowsPerPage}`,
      providesTags: ["Bill"],
    }),

    getBill: builder.query<BillResponse, number>({
      query: (id) => `/${id}?search=type:bill`,
      providesTags: ["Bill"],
    }),
  }),
});

export const { useGetBillsQuery, useGetBillQuery } = billsApi;
