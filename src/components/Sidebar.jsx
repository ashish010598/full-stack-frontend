import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menu = [
    { label: "Dashboard", path: "/" },
    { label: "Students", path: "/students" },
    { label: "Drives", path: "/drives" },
    { label: "Logout", path: "/logout", onClick: handleLogout },
  ];

  const activeStyle = {
    backgroundColor: "#eee",
    fontWeight: "bold",
    paddingLeft: "5px",
  };

  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#f3f3f3",
        padding: "1rem",
        boxSizing: "border-box",
        position: "fixed",
        top: "0px",
      }}
    >
      <h3 style={{ color: "#000", marginBottom: "50px" }}>💉 Portal</h3>
      {menu.map((item, index) => (
        <div key={index} style={{ margin: "1rem 0" }}>
          {item.label === "Logout" ? (
            <button
              onClick={item.onClick}
              style={{
                background: "none",
                border: "none",
                color: location.pathname === item.path ? "#000" : "#0073e6",
                cursor: "pointer",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
                padding: "0px",
                paddingLeft: "5px",
              }}
            >
              {item.label}
            </button>
          ) : (
            <Link
              to={item.path}
              style={
                location.pathname === item.path
                  ? activeStyle
                  : { paddingLeft: "5px" }
              }
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
