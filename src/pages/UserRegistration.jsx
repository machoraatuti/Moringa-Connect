import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF",
};

const UserRegistration = ({ onLogin, onSignUp }) => {
  const [authTab, setAuthTab] = useState(0); // 0 for Login, 1 for Sign Up
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    // Placeholder logic for login
    onLogin();
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Placeholder logic for sign-up
    onSignUp();
  };

  return (
    <Box
      sx={{
        width: 400,
        bgcolor: moringaColors.white,
        boxShadow: 24,
        p: 4,
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: moringaColors.primary }}>
          {authTab === 0 ? "Sign In" : "Sign Up"}
        </Typography>
        <IconButton>
          <Close />
        </IconButton>
      </Box>

      {/* Tabs for Login and Sign-Up */}
      <Tabs
        value={authTab}
        onChange={(e, newValue) => setAuthTab(newValue)}
        textColor="primary"
        indicatorColor="secondary"
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>

      {authTab === 0 ? (
        // Login Form
        <Box>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: moringaColors.secondary,
              "&:hover": { bgcolor: moringaColors.primary },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography
            sx={{
              textAlign: "center",
              mt: 2,
              color: moringaColors.primary,
              fontSize: "14px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Forgot password?
          </Typography>
        </Box>
      ) : (
        // Sign-Up Form
        <Box>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: moringaColors.secondary,
              "&:hover": { bgcolor: moringaColors.primary },
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserRegistration;
