import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ViewGroup = ({ group, onClose }) => {
  return (
    <Box p={3}>
      <Typography variant="h4">{group.name}</Typography>
      <Typography variant="h6" color="textSecondary">{group.category}</Typography>
      <Typography variant="body1" paragraph>{group.description}</Typography>
      <Button variant="contained" onClick={onClose}>Close</Button>
    </Box>
  );
};

export default ViewGroup;
