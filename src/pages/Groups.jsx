import React, { useState, useEffect } from 'react';
import { 
  Box, TableContainer, Table, TableHead, TableBody,
  TableRow, TableCell, Paper, IconButton, TextField,
  Tooltip, Typography, Button, Chip, Grid, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { 
  Delete, Edit, Visibility, Group, Add,
  Work, Event, Chat, GroupAdd
} from '@mui/icons-material';
import CreateGroup from '../components/CreateGroup';
import { fetchGroupsFromFirestore, addGroupToFirestore, deleteGroupFromFirestore, updateGroupInFirestore, joinGroupInFirestore, fetchGroupMembers } from '../firebaseConfig'; // Updated import

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openViewGroup, setOpenViewGroup] = useState(false);
  const [openEditGroup, setOpenEditGroup] = useState(false); // Modal state for editing group
  const [selectedGroup, setSelectedGroup] = useState(null); // Store the selected group data
  const [groups, setGroups] = useState([]); // Store groups fetched from Firestore

  const [upcomingEvents, setUpcomingEvents] = useState('');
  const [discussions, setDiscussions] = useState('');
  const [jobPostings, setJobPostings] = useState('');

  // Fetch groups from Firestore and member count for each group when the component loads
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const fetchedGroups = await fetchGroupsFromFirestore();
        
        // Fetch member count for each group
        const groupsWithMembers = await Promise.all(
          fetchedGroups.map(async (group) => {
            const members = await fetchGroupMembers(group.id);
            return { ...group, memberCount: members.length };
          })
        );
        
        setGroups(groupsWithMembers);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    loadGroups();
  }, []);

  // Filter groups based on search term
  const filteredGroups = groups.filter((group) => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add a new group and update Firestore
  const handleAddGroup = async (newGroup) => {
    try {
      // Add new group to Firestore
      const savedGroup = await addGroupToFirestore(newGroup);
      setGroups((prevGroups) => [...prevGroups, savedGroup]);
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  // Delete a group from Firestore
  const handleDeleteGroup = async (groupId) => {
    try {
      // Delete group from Firestore
      await deleteGroupFromFirestore(groupId);
      
      // Remove the group from the state
      setGroups((prevGroups) => prevGroups.filter(group => group.id !== groupId));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  // Handle View Group click to open modal with group data
  const handleViewGroup = (group) => {
    setSelectedGroup(group);
    setOpenViewGroup(true); // Open the modal
  };

  // Handle Edit Group click to open modal for editing
  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setUpcomingEvents(group.upcomingEvents || '');
    setDiscussions(group.recentDiscussions || '');
    setJobPostings(group.jobPostings || '');
    setOpenEditGroup(true); // Open the edit modal
  };

  // Save the edited group data
  const handleSaveEdit = async () => {
    try {
      // Create the updated group data
      const updatedGroup = {
        ...selectedGroup,
        upcomingEvents,
        recentDiscussions: discussions,
        jobPostings
      };
      
      // Update the group in Firestore
      await updateGroupInFirestore(updatedGroup.id, updatedGroup);
      
      // Update the group in the state by replacing the old data with the updated one
      setGroups((prevGroups) => 
        prevGroups.map((group) => 
          group.id === updatedGroup.id ? updatedGroup : group
        )
      );
  
      // Close the edit modal
      setOpenEditGroup(false);
    } catch (error) {
      console.error('Error saving edited group:', error);
    }
  };

  // Increment the number of members in a group and update Firestore
  const handleJoinGroup = async (groupId) => {
    try {
      // Update Firestore first
      await joinGroupInFirestore(groupId);
  
      // Find the group in the local state and increment the member count
      setGroups((prevGroups) => 
        prevGroups.map((group) => 
          group.id === groupId 
            ? { ...group, memberCount: group.memberCount + 1 } 
            : group
        )
      );
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  // Close View Group modal
  const handleCloseViewGroup = () => {
    setOpenViewGroup(false);
    setSelectedGroup(null); // Clear the selected group
  };

  // Close Edit Group modal
  const handleCloseEditGroup = () => {
    setOpenEditGroup(false);
    setSelectedGroup(null); // Clear the selected group
  };

  return (
    <Box p={3} sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 600 }}>
          Alumni Groups
        </Typography>
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
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: `1px solid ${colors.divider}`
        }}
      >
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
              <TableRow 
                key={group.id}
                sx={{ '&:hover': { bgcolor: colors.background } }}
              >
                <TableCell>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: colors.primary, fontWeight: 600 }}>
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {group.description}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={group.category}
                    size="small"
                    sx={{ 
                      bgcolor: colors.secondary,
                      color: colors.white
                    }}
                  />
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
                    <IconButton sx={{ color: colors.secondary }} onClick={() => handleEditGroup(group)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteGroup(group.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  {/* Join Group Icon */}
                  <Tooltip title="Join Group">
                    <IconButton sx={{ color: colors.secondary }} onClick={() => handleJoinGroup(group.id)}>
                      <GroupAdd />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Group Modal */}
      <CreateGroup 
        open={openCreateGroup} 
        onClose={() => setOpenCreateGroup(false)} 
        onAddGroup={handleAddGroup}
      />

      {/* View Group Modal */}
      {selectedGroup && (
        <Dialog open={openViewGroup} onClose={handleCloseViewGroup}>
          <DialogTitle>{selectedGroup.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Description:</strong> {selectedGroup.description}
            </Typography>
            <Typography variant="body1">
              <strong>Members:</strong> {selectedGroup.memberCount || 0}
            </Typography>
            <Typography variant="body1">
              <strong>Upcoming Events:</strong> {selectedGroup.upcomingEvents || 'None'}
            </Typography>
            <Typography variant="body1">
              <strong>Recent Discussions:</strong> {selectedGroup.recentDiscussions || 'None'}
            </Typography>
            <Typography variant="body1">
              <strong>Job Opportunities:</strong> {selectedGroup.jobPostings || 'None'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewGroup}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit Group Modal */}
      <Dialog open={openEditGroup} onClose={handleCloseEditGroup}>
        <DialogTitle>Edit Group</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Upcoming Events"
            variant="outlined"
            value={upcomingEvents}
            onChange={(e) => setUpcomingEvents(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Recent Discussions"
            variant="outlined"
            value={discussions}
            onChange={(e) => setDiscussions(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Job Postings"
            variant="outlined"
            value={jobPostings}
            onChange={(e) => setJobPostings(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditGroup}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Groups;