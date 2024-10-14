import React from "react";
import "./layout.css";
import Sidebar from "../component/sidebar";
import Header from "../component/header";

const AdminLayout = ({ children }) => {
  return (
    <div className="main">
      <Header />
      <div className="content">
        <Sidebar />
        <div className="main-container">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
