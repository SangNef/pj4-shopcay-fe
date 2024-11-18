import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Link, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth"; // Import your registration API function
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// Styled components for consistency with the MUI template
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  minHeight: "100%",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
}));

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await register({ username, fullname, email, password });
    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/"); // Redirect to home or another page
    } else {
      setError("Username or Email already exists.");
    }
  };

  useEffect(() => {
    document.title = "AlaZea - Register";
  }, []);

  return (
    <SignInContainer>
      <Card variant="outlined">
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
          Register
        </Typography>
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            id="username-field" // Custom ID to prevent autofill
            name="username-field" // Custom name
            autoComplete="new-username" // Prevent autofill
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
            id="fullname-field" // Custom ID to prevent autofill
            name="fullname-field" // Custom name
            autoComplete="new-name" // Prevent autofill
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
            id="email-field" // Custom ID
            name="email-field" // Custom name
            autoComplete="new-email" // Prevent autofill
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
            id="password-field" // Custom ID
            name="password-field" // Custom name
            autoComplete="new-password" // Prevent autofill
          />
          {error && <Typography sx={{ color: "red", textAlign: "center" }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Register
          </Button>
        </form>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Typography sx={{ textAlign: 'center', mt: 2 }}>
          Already have an account?{" "}
          <Link href="#" onClick={() => navigate("/login")} color="primary">
            Login
          </Link>
        </Typography>
      </Card>
    </SignInContainer>
  );
};

export default Register;
