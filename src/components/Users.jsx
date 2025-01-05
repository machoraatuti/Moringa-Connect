import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Features/User/userSlice';
import { 
  Box, Grid, Card, Avatar, Typography, IconButton, TextField,
  Chip, Stack, Button, Menu, MenuItem, CircularProgress
} from '@mui/material';
import { 
  Delete, Edit, Email, LinkedIn, Visibility, Work, School,
  Language, GitHub, FilterList, Add, MoreVert, CalendarMonth
} from '@mui/icons-material';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)',
  success: '#4caf50',
  online: '#4caf50',
  offline: '#757575'
};

const Users = () => {
  const dispatch = useDispatch();
  const { users, onlineUsers, loading, error } = useSelector(state => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getFilteredUsers = () => {
    let filtered = users.filter(user => 
      Object.values(user).some(val => 
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (selectedFilter !== 'All') {
      filtered = filtered.filter(user => user.status === selectedFilter);
    }

    return filtered;
  };

  const isUserOnline = (userId) => {
    return onlineUsers[userId] || false;
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
      >
        <CircularProgress sx={{ color: colors.secondary }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: colors.background, minHeight: '100vh', p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 600 }}>
          Alumni Directory
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          sx={{ 
            bgcolor: colors.secondary,
            '&:hover': { bgcolor: colors.primary }
          }}
        >
          Add Alumni
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          fullWidth
          placeholder="Search by name, company, skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: colors.white,
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: colors.secondary },
              '&.Mui-focused fieldset': { borderColor: colors.secondary }
            }
          }}
        />
        <Button 
          startIcon={<FilterList />}
          onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          sx={{ color: colors.primary }}
        >
          {selectedFilter}
        </Button>
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={() => setFilterAnchorEl(null)}
        >
          {['All', 'Employed', 'Freelancing', 'Seeking'].map((filter) => (
            <MenuItem 
              key={filter}
              onClick={() => {
                setSelectedFilter(filter);
                setFilterAnchorEl(null);
              }}
            >
              {filter}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Grid container spacing={3}>
        {getFilteredUsers().map((user) => (
          <Grid item xs={12} md={6} key={user.id}>
            <Card sx={{ 
              p: 3,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' },
              border: `1px solid ${colors.divider}`
            }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box display="flex" gap={2}>
                  <Box position="relative">
                    <Avatar 
                      src={user.avatar} 
                      sx={{ 
                        width: 80, 
                        height: 80,
                        border: `3px solid ${colors.secondary}`
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: isUserOnline(user.id) ? colors.online : colors.offline,
                        border: `2px solid ${colors.white}`
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: colors.primary }}>
                      {user.name}
                      {isUserOnline(user.id) && (
                        <Typography 
                          component="span" 
                          variant="caption" 
                          sx={{ 
                            ml: 1,
                            color: colors.online,
                            bgcolor: `${colors.online}15`,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1
                          }}
                        >
                          Online
                        </Typography>
                      )}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {user.role} at {user.company}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Work sx={{ fontSize: 16, color: colors.secondary }} />
                      {user.location}
                    </Typography>
                  </Box>
                </Box>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Box>

              {/* Rest of the card content remains the same */}
              {/* ... */}

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Chip 
                    label={user.status}
                    size="small"
                    sx={{ 
                      bgcolor: user.status === 'Employed' ? colors.success : colors.secondary,
                      color: colors.white
                    }}
                  />
                </Box>
                <Box display="flex" gap={1}>
                  <IconButton size="small" sx={{ color: colors.primary }}>
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" sx={{ color: colors.secondary }}>
                    <Email />
                  </IconButton>
                  <IconButton size="small" sx={{ color: colors.primary }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton size="small" sx={{ color: colors.primary }}>
                    <GitHub />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Users;