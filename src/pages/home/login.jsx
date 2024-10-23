import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Divider, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth"; // Assuming you have an API for authentication
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = validateInputs();
    if (isValid) {
      try {
        const response = await login({ email, password });
        if (response) {
          localStorage.setItem("user", JSON.stringify(response));
          navigate("/");
        } else {
          setError("Invalid email or password.");
        }
      } catch (error) {
        setError("Invalid email or password.");
      }
    }
  };

  const validateInputs = () => {
    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    return isValid;
  };

  return (
    <SignInContainer>
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            error={emailError}
            helperText={emailErrorMessage}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email-field" // Use a custom id
            name="email-field" // Custom name to confuse the browser
            autoComplete="new-email"
            required
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="body1">Password</Typography>
            <Link component="button" type="button" variant="body2">
              Forgot your password?
            </Link>
          </Box>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorMessage}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password-field" // Custom id
            name="password-field" // Custom name
            autoComplete="new-password" //
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          {error && <Typography sx={{ color: "red", textAlign: "center" }}>{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign in
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Typography sx={{ textAlign: "center", mt: 2 }}>
          Don’t have an account?{" "}
          <Link href="#" onClick={() => navigate("/register")} color="primary">
            Sign up
          </Link>
        </Typography>
      </Card>
    </SignInContainer>
  );
};

export default Login;
