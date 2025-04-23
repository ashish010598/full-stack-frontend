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
  };

  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#f3f3f3",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <h3>💉 Portal</h3>
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
              }}
            >
              {item.label}
            </button>
          ) : (
            <Link
              to={item.path}
              style={location.pathname === item.path ? activeStyle : {}}
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
