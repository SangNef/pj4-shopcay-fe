import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth"; // Import your registration API function

const Register = () => {
  const [username, setUsername] = useState(""); // State for username
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await register({ username, fullname, email, password });
    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/"); // Redirect to home or another page
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
        Register
      </Typography>
      <form onSubmit={handleRegister} style={{ width: "100%", maxWidth: "400px" }}>
        <TextField
          label="Username" // New input field for username
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Full Name"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
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
          Register
        </Button>
      </form>
      <Typography sx={{ marginTop: 2 }}>
        Already have an account?{" "}
        <Link href="#" onClick={() => navigate("/login")} color="primary">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
