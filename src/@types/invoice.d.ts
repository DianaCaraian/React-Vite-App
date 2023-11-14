export interface Invoice {
  id: number;
  contact_name: string;
  due_at: Date;
  issued_at: Date;
  amount_formatted: string;
  status: string;
  contact_email: string;
  contact_phone: string;
}

export interface InvoiceListResponse {
  data: Invoice[];
  meta: {
    total: number;
  };
}

export interface InvoiceResponse {
  data: Invoice;
}
