import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2"
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
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: moringaColors.background
        }}
      >
        <CircularProgress sx={{ color: moringaColors.secondary }} />
      </Box>
    );
  }

  if (!verifyAdminStatus()) {
    // Redirect to login with the current location saved
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedAdminRoute;