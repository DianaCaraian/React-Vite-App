import React from "react";
import InvoiceList from "../components/InvoiceList.tsx";

const Invoices: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-8 mt-8 text-3xl font-bold">Invoices</h1>
      <InvoiceList />
    </div>
  );
};

export default Invoices;
