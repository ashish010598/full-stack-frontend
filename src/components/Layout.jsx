import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  // Handle logout manually
  React.useEffect(() => {
    if (window.location.pathname === "/logout") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: "2rem",
          overflowX: "auto",
          marginLeft: "250px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
