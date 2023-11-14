export interface Bill {
  id: number;
  contact_name: string;
  due_at: Date;
  issued_at: Date;
  amount_formatted: string;
  status: string;
  document_number: string;
  contact_email: string;
  contact_phone: string;
}

export interface BillListResponse {
  data: Bill[];
  meta: {
    total: number;
  };
}

export interface BillResponse {
  data: Bill;
}
