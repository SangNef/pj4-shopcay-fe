import React, { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton, Button, Badge } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate, NavLink } from "react-router-dom"; // Use NavLink for active state

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [productMenuOpen, setProductMenuOpen] = useState(false); // State to manage submenu visibility
  const [timeoutId, setTimeoutId] = useState(null); // State to store timeout ID
  const [cartCount, setCartCount] = useState(0);
  const open = Boolean(anchorEl);
  const navigation = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigation("/login");
  };

  // Show the submenu immediately on mouse enter
  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear any previous timeout to avoid premature hiding
    }
    setProductMenuOpen(true);
  };

  // Hide the submenu after 1 second on mouse leave
  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setProductMenuOpen(false);
    }, 200);
    setTimeoutId(id); // Store the timeout ID
  };

  return (
    <div
      style={{
        backgroundColor: "#9a9a9a",
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1120px",
          margin: "auto",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: "#fff" }} className="text-2xl font-semibold">ALA<span className="text-green-400">ZEA</span></h1>
        </div>
        <nav>
          <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ margin: "0 10px" }}>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "green" : "#fff", // Active state color
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s, color 0.3s",
                })}
              >
                Home
              </NavLink>
            </li>

            {/* Products with Submenu */}
            <li
              style={{ margin: "0 10px", position: "relative" }}
              onMouseEnter={handleMouseEnter} // Show submenu on mouse enter
              onMouseLeave={handleMouseLeave} // Hide submenu after 1s on mouse leave
            >
              <NavLink
                to="/products"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                }}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "green" : "#fff", // Active state color
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s, color 0.3s",
                })}
              >
                Products
              </NavLink>

              {/* Submenu */}
              {productMenuOpen && (
                <ul
                  style={{
                    position: "absolute",
                    top: "40px",
                    left: "0",
                    backgroundColor: "#fff",
                    padding: "10px 0",
                    borderRadius: "4px",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                    listStyle: "none",
                    minWidth: "200px",
                    zIndex: 1000,
                  }}
                >
                  <li style={{ padding: "8px 12px" }}>
                    <NavLink
                      to="/products/fruit-trees"
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "green" : "#333", // Active state color
                      })}
                    >
                      Fruit Tree
                    </NavLink>
                  </li>
                  <li style={{ padding: "8px 12px" }}>
                    <NavLink
                      to="/products/flowering-trees"
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "green" : "#333", // Active state color
                      })}
                    >
                      Flowering Tree
                    </NavLink>
                  </li>
                  <li style={{ padding: "8px 12px" }}>
                    <NavLink
                      to="/products/shade-trees"
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "green" : "#333", // Active state color
                      })}
                    >
                      Shade Tree
                    </NavLink>
                  </li>
                  <li style={{ padding: "8px 12px" }}>
                    <NavLink
                      to="/products/ornamental-trees"
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "green" : "#333", // Active state color
                      })}
                    >
                      Ornamental Tree
                    </NavLink>
                  </li>
                  <li style={{ padding: "8px 12px" }}>
                    <NavLink
                      to="/products/evergreen-trees"
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? "green" : "#333", // Active state color
                      })}
                    >
                      Evergreen Tree
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li style={{ margin: "0 10px" }}>
              <NavLink
                to="/about"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "green" : "#fff", // Active state color
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s, color 0.3s",
                })}
              >
                About
              </NavLink>
            </li>
            <li style={{ margin: "0 10px" }}>
              <NavLink
                to="/contact"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "green" : "#fff", // Active state color
                  padding: "8px 12px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s, color 0.3s",
                })}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          {user ? (
            <div>
              <IconButton component={Link} to="/cart" color="inherit">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon style={{ color: "#fff" }} />
                </Badge>
              </IconButton>
              <IconButton size="large" edge="end" color="inherit" onClick={handleClick}>
                <AccountCircleIcon style={{ color: "#fff" }} />
                <span style={{ marginLeft: "8px", color: "#fff", fontSize: 14 }}>{user.username}</span>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <a href="/profile" style={{ textDecoration: "none", color: "#000" }}>
                    Profile
                  </a>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/orders" style={{ textDecoration: "none", color: "#000" }}>
                    My Orders
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <a style={{ textDecoration: "none", color: "#000" }}>Logout</a>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Button variant="contained" color="secondary" href="/login" style={{ marginRight: "10px" }}>
                Login
              </Button>
              <Button variant="contained" color="secondary" href="/register">
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
