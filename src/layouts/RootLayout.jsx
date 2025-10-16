import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 px-10 pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
