import React from "react";
import "./layout.css";
import Sidebar from "../component/sidebar";
import Header from "../component/header";
import { Navigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role != "ADMIN") {
    return <Navigate to="/" />;
  }
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
