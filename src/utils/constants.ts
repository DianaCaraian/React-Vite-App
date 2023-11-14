import { Bill } from "../@types/bill";
import { Invoice } from "../@types/invoice";

export const rowsPerPage = 5;

export const API_URL = import.meta.env.VITE_API_URL;

export const apiErrorMessages = "Something went wrong";

export const billDetailsDefaultValue: Bill = {
  id: 0,
  contact_name: "",
  due_at: new Date(),
  issued_at: new Date(),
  amount_formatted: "",
  status: "",
  document_number: "",
  contact_email: "",
  contact_phone: "",
};

export const invoiceDetailsDefaultValue: Invoice = {
  id: 0,
  contact_name: "",
  due_at: new Date(),
  issued_at: new Date(),
  amount_formatted: "",
  status: "",
  contact_email: "",
  contact_phone: "",
};
