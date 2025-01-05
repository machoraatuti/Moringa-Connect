import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, clearError } from '../Features/auth/authSlice';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  IconButton,
  CircularProgress,
  Alert,
  Container
} from "@mui/material";
import { Close } from "@mui/icons-material";

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF",
};

const UserRegistration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, isAdmin } = useSelector(state => state.auth);
  
  const [authTab, setAuthTab] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Clear any existing auth errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    if (authTab === 1) {
      if (!formData.fullName) errors.fullName = 'Full name is required';
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLogin = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const credentials = {
        email: formData.email,
        password: formData.password
      };
      
      const result = await dispatch(loginUser(credentials)).unwrap();
      
      // Wait for Redux state to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (result.user && result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/app/groups');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleSignUp = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      };
      
      await dispatch(registerUser(userData)).unwrap();
      navigate('/app/groups');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setAuthTab(newValue);
    setFormErrors({});
    dispatch(clearError());
  };

  return (
    <Container 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: moringaColors.background
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: moringaColors.white,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          p: 4,
          borderRadius: "12px",
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
          <Typography variant="h5" sx={{ color: moringaColors.primary, fontWeight: 600 }}>
            {authTab === 0 ? "Welcome Back" : "Create Account"}
          </Typography>
          <IconButton onClick={() => navigate('/')} size="small">
            <Close />
          </IconButton>
        </Box>

        <Tabs
          value={authTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="secondary"
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {authTab === 0 ? (
          <Box>
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={handleLogin}
              sx={{
                bgcolor: moringaColors.secondary,
                "&:hover": { bgcolor: moringaColors.primary },
                py: 1.5
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </Box>
        ) : (
          <Box>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              variant="outlined"
              value={formData.fullName}
              onChange={handleInputChange}
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={handleSignUp}
              sx={{
                bgcolor: moringaColors.secondary,
                "&:hover": { bgcolor: moringaColors.primary },
                py: 1.5
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserRegistration;