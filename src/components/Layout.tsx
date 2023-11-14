import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="bg-gray-300 p-5 flex gap-4 pl-10 text-lg">
        <Link
          className="text-gray-800 no-underline font-semibold mr-4 "
          to="/invoices"
        >
          Invoices
        </Link>
        <Link className="text-gray-800 no-underline font-semibold" to="/bills">
          Bills
        </Link>
      </div>
    </div>
  );
};

export default Layout;
