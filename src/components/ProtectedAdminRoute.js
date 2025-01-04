// components/ProtectedAdminRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF"
};

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading, user } = useSelector(state => state.auth);
  const location = useLocation();

  const verifyAdminStatus = () => {
    return isAuthenticated && isAdmin && user?.role === 'admin';
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: moringaColors.background
        }}
      >
        <CircularProgress 
          size={40}
          thickness={4}
          sx={{ 
            color: moringaColors.secondary,
            mb: 2
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: moringaColors.primary,
            fontWeight: 500
          }}
        >
          Verifying credentials...
        </Typography>
      </Box>
    );
  }

  if (!verifyAdminStatus()) {
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location,
          message: "Please log in with administrator credentials to access this area."
        }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedAdminRoute;