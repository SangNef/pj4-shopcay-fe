import React from "react";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#9a9a9a",
        padding: "10px 20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1120px", margin: "auto" }}>
        <div>
          <h1 style={{ margin: 0, color: "#fff" }}>Logo</h1>
        </div>
        <nav>
          <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ margin: "0 10px" }}>
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s",
                }}
              >
                Home
              </a>
            </li>
            <li style={{ margin: "0 10px" }}>
              <a
                href="/products"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s",
                }}
              >
                Products
              </a>
            </li>
            <li style={{ margin: "0 10px" }}>
              <a
                href="/about"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s",
                }}
              >
                About
              </a>
            </li>
            <li style={{ margin: "0 10px" }}>
              <a
                href="/contact"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s",
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
