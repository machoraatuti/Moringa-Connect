import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Redux dispatch
import { Box, Typography, TextField, Button, Dialog, DialogContent, Select, MenuItem, IconButton, Snackbar, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import { addGroup } from '../redux/groupsSlice'; // Redux slice action
import { addGroupToFirestore } from '../firebaseConfig'; // Firestore function

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)',
};

const CreateGroup = ({ open, onClose, onAddGroup }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    category: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const categories = ['Software Engineering', 'Design', 'Data Science'];

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!groupData.name || !groupData.description || !groupData.category) {
        setSnackbar({ open: true, message: 'All fields are required', severity: 'error' });
        return;
      }

      const newGroup = await addGroupToFirestore(groupData);

      // Dispatch Redux action and update parent component
      dispatch(addGroup(newGroup));
      onAddGroup(newGroup);

      setSnackbar({ open: true, message: 'Group created successfully!', severity: 'success' });

      // Reset form and close dialog
      setGroupData({ name: '', description: '', category: '' });
      onClose();
    } catch (error) {
      console.error('Error creating group:', error);
      setSnackbar({ open: true, message: 'Failed to create group. Try again.', severity: 'error' });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600 }}>
                Create New Group
              </Typography>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Group Name"
                  fullWidth
                  required
                  value={groupData.name}
                  onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                />

                <Select
                  value={groupData.category}
                  onChange={(e) => setGroupData({ ...groupData, category: e.target.value })}
                  displayEmpty
                  renderValue={(selected) => selected || 'Select Category'}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  label="Group Description"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={groupData.description}
                  onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{ color: colors.primary }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: colors.secondary,
                      '&:hover': { bgcolor: colors.primary },
                    }}
                  >
                    Create Group
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateGroup;