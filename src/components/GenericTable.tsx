import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { MouseEvent } from "react";

interface Header {
  title: string;
  field: string;
  width: number | string;
}

interface GenericTableProps<T extends { id: number } & Record<string, any>> {
  tableHeaders: Header[];
  formatter: { [key: string]: (date: Date) => string };
  data: T[];
  totalData: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (_event: MouseEvent | null, newPage: number) => void;
  handleOpenModal: (id: number) => void;
  isLoading: boolean;
  error: string;
}

const GenericTable = <T extends { id: number } & Record<string, any>>({
  tableHeaders,
  formatter,
  data,
  totalData,
  page,
  rowsPerPage,
  handleChangePage,
  handleOpenModal,
  isLoading,
  error,
}: GenericTableProps<T>) => {
  return (
    <div className="min-w-96 flex justify-center rounded-md overflow-hidden">
      <Table className="m-auto">
        <TableHead className="bg-purple-700">
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell
                key={index}
                align="center"
                className={`border-r border-white`}
                sx={{
                  width: header.width,
                  color: "white",
                  fontSize: 17,
                }}
              >
                {header.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell
                align="center"
                colSpan={tableHeaders.length}
                className="p-4"
              >
                <CircularProgress color="secondary" />
              </TableCell>
            </TableRow>
          )}

          {error && !isLoading && (
            <TableRow>
              <TableCell
                align="center"
                colSpan={tableHeaders.length}
                className="p-4"
              >
                {error}
              </TableCell>
            </TableRow>
          )}

          {data.length !== 0 &&
            !isLoading &&
            data.map((elem, index) => {
              return (
                <TableRow
                  key={index}
                  onClick={() => handleOpenModal(elem.id)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {tableHeaders.map((header, index: number) => (
                    <TableCell key={index} align="center" className="p-4">
                      {formatter[header.field]
                        ? formatter[header.field](elem[header.field])
                        : elem[header.field]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            count={totalData}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            showFirstButton
            showLastButton
            rowsPerPageOptions={[rowsPerPage]}
          />
        </TableFooter>
      </Table>
    </div>
  );
};

export default GenericTable;
