import { useEffect, useState } from "react";
import { formatDate } from "../utils/helper.ts";
import {
  apiErrorMessages,
  invoiceDetailsDefaultValue,
  rowsPerPage,
} from "../utils/constants.ts";
import GenericTable from "./GenericTable.tsx";
import { Invoice } from "../@types/invoice";
import Bill_InvoiceDetailsPopUp from "./Bill_InvoiceDetailsPopUp.tsx";
import {
  useGetInvoiceQuery,
  useGetInvoicesQuery,
} from "../redux/apis/invoice.ts";
import { useDispatch, useSelector } from "react-redux";
import { setInvoice } from "../redux/slices/invices.ts";

const tableHeaders = [
  {
    title: "Contact Name",
    field: "contact_name",
    width: 250,
  },
  {
    title: "Due At",
    field: "due_at",
    width: 170,
  },
  {
    title: "Issued At",
    field: "issued_at",
    width: 170,
  },
  {
    title: "Amount",
    field: "amount_formatted",
    width: 170,
  },
  {
    title: "Status",
    field: "status",
    width: 200,
  },
];

const InvoiceList = () => {
  const dispatch = useDispatch();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesError, setInvoicesError] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalInvoices, setTotalInvoices] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [invoiceDetailsId, setInvoiceDetailsId] = useState<number>(0);

  const invoiceDetails = useSelector<any, Invoice>(
    (state) => state.invoices?.invoice,
  );
  const [detailsError, setDetailsError] = useState<string>("");

  const {
    data: invoiceListData,
    error: invoiceListError,
    isFetching: isInvoiceListFetching,
  } = useGetInvoicesQuery({ page, rowsPerPage });

  useEffect(() => {
    setTotalInvoices(invoiceListData?.meta.total || 0);
    setInvoices(invoiceListData?.data || []);
    if (invoiceListError) {
      setInvoicesError(apiErrorMessages);
    }
  }, [invoiceListData, invoiceListError]);

  const {
    data: invoiceData,
    error: invoiceError,
    isFetching: isInvoiceFetching,
  } = useGetInvoiceQuery(invoiceDetailsId, {
    skip: invoiceDetailsId === 0,
  });

  useEffect(() => {
    dispatch(setInvoice(invoiceData?.data || invoiceDetailsDefaultValue));
    if (invoiceError) {
      setDetailsError(apiErrorMessages);
    }
  }, [invoiceData, invoiceError]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const formatter: { [key: string]: (date: Date) => string } = {
    due_at: (date: Date) => formatDate(date),
    issued_at: (date: Date) => formatDate(date),
  };

  const handleOpenModal = (id: number) => {
    setOpenModal(true);
    setInvoiceDetailsId(id);
  };

  return (
    <div>
      <GenericTable<Invoice>
        tableHeaders={tableHeaders}
        data={invoices}
        isLoading={isInvoiceListFetching}
        error={invoicesError}
        totalData={totalInvoices}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleOpenModal={handleOpenModal}
        formatter={formatter}
      />

      <Bill_InvoiceDetailsPopUp
        open={openModal}
        handleClose={() => setOpenModal(false)}
        details={invoiceDetails}
        isLoading={isInvoiceFetching}
        error={detailsError}
      />
    </div>
  );
};

export default InvoiceList;
