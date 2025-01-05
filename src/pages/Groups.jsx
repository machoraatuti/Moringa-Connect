import React, { useState, useEffect } from 'react';
import {
  Box, TableContainer, Table, TableHead, TableBody, 
  TableRow, TableCell, Paper, IconButton, TextField, 
  Tooltip, Typography, Button, Chip, Grid, Dialog, 
  DialogContent
} from '@mui/material';
import { Delete, Edit, Visibility, Group, Add, Work, Event, Chat } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setGroups, addGroup, deleteGroup } from '../redux/groupsSlice';
import {
  fetchGroupsFromFirestore,
  addGroupToFirestore,
  updateGroupInFirestore,
  deleteGroupFromFirestore,
  joinGroupInFirestore
} from '../firebase';


const colors = { primary: '#0A1F44', secondary: '#F05A28', background: '#FFF5F2', white: '#FFFFFF', divider: 'rgba(240, 90, 40, 0.12)' };

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openEditGroup, setOpenEditGroup] = useState(false);
  const [openViewGroup, setOpenViewGroup] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);

  // Function to load groups from Firestore
  const loadGroups = async () => {
    try {
      const fetchedGroups = await fetchGroupsFromFirestore();
      dispatch(setGroups(fetchedGroups)); // Set groups in Redux state
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    loadGroups(); // Load groups when component mounts
  }, []); // Empty dependency array to run only once

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Join Group functionality
  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroupInFirestore(groupId); // Increment memberCount in Firestore
      loadGroups(); // Reload groups to reflect the updated memberCount
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const handleAddGroup = async (newGroup) => {
    try {
      const savedGroup = await addGroupToFirestore(newGroup);
      dispatch(addGroup(savedGroup)); // Update Redux state
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const handleEditGroup = async (updatedGroup) => {
    try {
      await updateGroupInFirestore(updatedGroup.id, updatedGroup);
      dispatch(setGroups(groups.map(group => group.id === updatedGroup.id ? updatedGroup : group))); // Update Redux state
      setOpenEditGroup(false);
    } catch (error) {
      console.error('Error editing group:', error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroupFromFirestore(groupId);
      dispatch(deleteGroup(groupId)); // Remove group from Redux state
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleViewGroup = (group) => {
    setCurrentGroup(group);
    setOpenViewGroup(true);
  };

  return (
    <Box p={3} sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 600 }}>Alumni Groups</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreateGroup(true)}
          sx={{
            bgcolor: colors.secondary,
            '&:hover': { bgcolor: colors.primary },
            px: 3
          }}
        >
          Create New Group
        </Button>
      </Box>

      {/* Search Bar */}
      <Box mb={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Search Groups"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: colors.secondary },
                  '&.Mui-focused fieldset': { borderColor: colors.secondary },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: colors.secondary },
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Groups Table */}
      <TableContainer component={Paper} sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: `1px solid ${colors.divider}` }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: colors.primary }}>
              <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Group Name</TableCell>
              <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Members</TableCell>
              <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Activity</TableCell>
              <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGroups.map((group) => (
              <TableRow key={group.id} sx={{ '&:hover': { bgcolor: colors.background } }}>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: colors.primary, fontWeight: 600 }}>
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">{group.description}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={group.category} size="small" sx={{ bgcolor: colors.secondary, color: colors.white }} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Group sx={{ color: colors.primary, mr: 1 }} />
                    <Typography>{group.memberCount || 0} members</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Event sx={{ fontSize: 16, mr: 1, color: colors.secondary }} />
                      {group.upcomingEvents || 0} upcoming events
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chat sx={{ fontSize: 16, mr: 1, color: colors.secondary }} />
                      {group.recentDiscussions || 0} discussions
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Work sx={{ fontSize: 16, mr: 1, color: colors.secondary }} />
                      {group.jobPostings || 0} job opportunities
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="View Group">
                    <IconButton sx={{ color: colors.primary }} onClick={() => handleViewGroup(group)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      sx={{ color: colors.secondary }}
                      onClick={() => {
                        setCurrentGroup(group);
                        setOpenEditGroup(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteGroup(group.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Join Group">
                    <IconButton sx={{ color: colors.secondary }} onClick={() => handleJoinGroup(group.id)}>
                      <Group />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Group Modal */}
      <Dialog open={openCreateGroup} onClose={() => setOpenCreateGroup(false)} maxWidth="md" fullWidth>
        <DialogContent>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600 }}>Create New Group</Typography>
            <TextField
              fullWidth
              label="Group Name"
              onChange={(e) => setCurrentGroup({ ...currentGroup, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              onChange={(e) => setCurrentGroup({ ...currentGroup, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Category"
              onChange={(e) => setCurrentGroup({ ...currentGroup, category: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={() => handleAddGroup(currentGroup)}>
              Create Group
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Edit Group Modal */}
      {currentGroup && (
        <Dialog open={openEditGroup} onClose={() => setOpenEditGroup(false)} maxWidth="md" fullWidth>
          <DialogContent>
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600 }}>Edit Group: {currentGroup.name}</Typography>
              <TextField
                fullWidth
                label="Group Name"
                value={currentGroup.name}
                onChange={(e) => setCurrentGroup({ ...currentGroup, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={currentGroup.description}
                onChange={(e) => setCurrentGroup({ ...currentGroup, description: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Category"
                value={currentGroup.category}
                onChange={(e) => setCurrentGroup({ ...currentGroup, category: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={() => handleEditGroup(currentGroup)}>
                Save Changes
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* View Group Modal */}
      {currentGroup && (
        <Dialog open={openViewGroup} onClose={() => setOpenViewGroup(false)} maxWidth="md" fullWidth>
          <DialogContent>
            <Box sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600 }}>View Group: {currentGroup.name}</Typography>
              <Typography variant="body1">{currentGroup.description}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Category: <Chip label={currentGroup.category} size="small" sx={{ bgcolor: colors.secondary, color: colors.white }} />
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>Members: {currentGroup.memberCount}</Typography>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Groups;













