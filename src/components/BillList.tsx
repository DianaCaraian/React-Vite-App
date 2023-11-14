import { MouseEvent, useEffect, useState } from "react";
import { formatDate } from "../utils/helper.ts";
import GenericTable from "./GenericTable.tsx";
import {
  apiErrorMessages,
  billDetailsDefaultValue,
  rowsPerPage,
} from "../utils/constants.ts";
import { Bill } from "../@types/bill";
import Bill_InvoiceDetailsPopUp from "./Bill_InvoiceDetailsPopUp.tsx";
import { useGetBillQuery, useGetBillsQuery } from "../redux/apis/bills.ts";
import { useDispatch, useSelector } from "react-redux";
import { setBill } from "../redux/slices/bills.ts";

const tableHeaders = [
  {
    title: "Contact Name",
    field: "contact_name",
    width: 250,
  },
  {
    title: "Due At",
    field: "due_at",
    width: 150,
  },
  {
    title: "Amount",
    field: "amount_formatted",
    width: 100,
  },
  {
    title: "Status",
    field: "status",
    width: 100,
  },
  {
    title: "Document Number",
    field: "document_number",
    width: 200,
  },
  {
    title: "Contact Email",
    field: "contact_email",
    width: 260,
  },
];

const BillList = () => {
  const dispatch = useDispatch();

  const [bills, setBills] = useState<Bill[]>([]);
  const [billsError, setBillsError] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [totalBills, setTotalBills] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [billDetailsId, setBillDetailsId] = useState<number>(0);
  const billDetails = useSelector<any, Bill>((state) => state.bills?.bill);
  const [detailsError, setDetailsError] = useState<string>("");

  const {
    data: billListData,
    error: billListError,
    isFetching: billListIsFetching,
  } = useGetBillsQuery({ page, rowsPerPage });

  useEffect(() => {
    setTotalBills(billListData?.meta.total || 0);
    setBills(billListData?.data || []);
    if (billListError) {
      setBillsError(apiErrorMessages);
    }
  }, [billListData, billListError]);

  const {
    data: billData,
    error: billError,
    isFetching: billIsFetching,
  } = useGetBillQuery(billDetailsId, {
    skip: billDetailsId === 0,
  });

  useEffect(() => {
    dispatch(setBill(billData?.data || billDetailsDefaultValue));
    if (billError) {
      setDetailsError(apiErrorMessages);
    }
  }, [billData, billError]);

  const handleChangePage = (_event: MouseEvent | null, newPage: number) => {
    setPage(newPage);
  };

  const formatter: { [key: string]: (date: Date) => string } = {
    due_at: (date: Date) => formatDate(date),
    issued_at: (date: Date) => formatDate(date),
  };

  const handleOpenModal = (id: number) => {
    setOpenModal(true);
    setBillDetailsId(id);
  };

  return (
    <div>
      <GenericTable<Bill>
        tableHeaders={tableHeaders}
        data={bills}
        isLoading={billListIsFetching}
        error={billsError}
        totalData={totalBills}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleOpenModal={handleOpenModal}
        formatter={formatter}
      />

      <Bill_InvoiceDetailsPopUp
        open={openModal}
        handleClose={() => setOpenModal(false)}
        details={billDetails}
        isLoading={billIsFetching}
        error={detailsError}
      />
    </div>
  );
};

export default BillList;
