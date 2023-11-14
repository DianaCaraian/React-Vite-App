import React from "react";
import BillList from "../components/BillList.tsx";

const Bills: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-8 mt-8 text-3xl font-bold">Bills</h1>
      <BillList />
    </div>
  );
};

export default Bills;
