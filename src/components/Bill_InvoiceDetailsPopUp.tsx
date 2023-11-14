import { Box, CircularProgress, Dialog, Link } from "@mui/material";
import { Bill } from "../@types/bill";
import { Invoice } from "../@types/invoice";
import { formatDate } from "../utils/helper.ts";

interface Bill_InvoiceDetailsPopUpProps {
  open: boolean;
  handleClose: () => void;
  details: Bill | Invoice;
  error: string;
  isLoading: boolean;
}

const Bill_InvoiceDetailsPopUp = (props: Bill_InvoiceDetailsPopUpProps) => {
  const { open, handleClose, details, isLoading, error } = props;

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={open}
        className="min-h-[400px] min-w-[400px]"
      >
        {isLoading && (
          <Box sx={{ margin: 18 }}>
            <CircularProgress color="secondary" />
          </Box>
        )}

        {error && !isLoading && (
          <Box className="m-20 text-red-500">
            <p>{error}</p>
          </Box>
        )}

        {!error && !isLoading && (
          <Box className="p-9">
            <h1 className={"text-3xl"}>{details.contact_name}</h1>
            <Box className="mt-4">Due Date: {formatDate(details.due_at)}</Box>
            <Box className="mt-1">
              Issue Date: {formatDate(details.issued_at)}
            </Box>
            <Box className="mt-4 text-gray-500">
              <>Contact: </>
              <Link href={`mailto:${details.contact_email}`}>
                {details.contact_email}
              </Link>
            </Box>
            <Box className="mt-1 text-gray-500">
              <>Phone: </>
              <span className="text-black">{details.contact_phone}</span>
            </Box>
            <Box className="mt-4 text-purple-500">Status: {details.status}</Box>
          </Box>
        )}
      </Dialog>
    </div>
  );
};

export default Bill_InvoiceDetailsPopUp;
