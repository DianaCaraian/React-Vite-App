import React from "react";
import { Route, Routes } from "react-router-dom";
import Invoices from "../pages/Invoices";
import Bills from "../pages/Bills";
import Layout from "../components/Layout.tsx";

const AppRouter: React.FC = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="invoices" element={<Invoices />} />
        <Route path="bills" element={<Bills />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
