import { createApi } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../utils/constants.ts";
import { InvoiceListResponse, InvoiceResponse } from "../../@types/invoice";
import { axiosBaseQuery } from "../apis.ts";

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
    headers: {
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_USERNAME}:${import.meta.env.VITE_PASSWORD}`,
      )}`,
    },
  }),
  endpoints: (builder) => ({
    getInvoices: builder.query<
      InvoiceListResponse,
      { page: number; rowsPerPage: number }
    >({
      query: ({ page, rowsPerPage }) => ({
        url: `?search=type:invoice&page=${page + 1}&limit=${rowsPerPage}`,
      }),
    }),

    getInvoice: builder.query<InvoiceResponse, number>({
      query: (id) => ({
        url: `/${id}?search=type:invoice`,
      }),
    }),
  }),
});

export const { useGetInvoicesQuery, useGetInvoiceQuery } = invoicesApi;
