import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
        backgroundColor: "#f4f6f8",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "400px" }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Login
        </Button>
      </form>
      <Typography sx={{ marginTop: 2 }}>
        Don’t have an account?{" "}
        <Link href="#" onClick={() => navigate("/register")} color="primary">
          Register
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
