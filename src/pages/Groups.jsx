import React, { useState } from 'react';
import { 
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Divider,
   Grid
} from '@mui/material';
import { 
  Delete, 
  Edit, 
  Visibility, 
  Group, 
  Add,
  School,
  Work,
  Event,
  Chat
} from '@mui/icons-material';

// Moringa color scheme
const colors = {
  primary: '#0A1F44', // Navy blue
  secondary: '#F05A28', // Orange
  background: '#FFF5F2', // Light peach
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const groups = [
    {
      id: 1,
      name: 'Software Engineering Alumni 2024',
      dateCreated: '2024-01-15',
      members: 45,
      description: 'A community for SE graduates to network and share opportunities',
      category: 'Software Engineering',
      upcomingEvents: 2,
      recentDiscussions: 5,
      jobPostings: 3
    },
    {
      id: 2,
      name: 'UI/UX Design Network',
      dateCreated: '2024-01-16',
      members: 32,
      description: 'Connect with fellow UX designers from Moringa',
      category: 'Design',
      upcomingEvents: 1,
      recentDiscussions: 8,
      jobPostings: 4
    },
    {
      id: 3,
      name: 'Data Science Cohort 2023',
      dateCreated: '2024-01-17',
      members: 28,
      description: 'Data Science alumni collaboration and mentorship',
      category: 'Data Science',
      upcomingEvents: 3,
      recentDiscussions: 12,
      jobPostings: 6
    }
  ];

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3} sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 600 }}>
          Alumni Groups
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: colors.secondary,
            '&:hover': { bgcolor: colors.primary },
            px: 3
          }}
        >
          Create New Group
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ bgcolor: colors.primary, color: colors.white }}>
              <CardContent>
                <Group sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4">{groups.length}</Typography>
                <Typography>Active Groups</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more stat cards as needed */}
        </Grid>
      </Box>

      <TextField
        fullWidth
        label="Search Groups"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: colors.secondary },
            '&.Mui-focused fieldset': { borderColor: colors.secondary },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: colors.secondary },
        }}
      />

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
                    <Typography>{group.members} members</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Event sx={{ fontSize: 16, mr: 1, color: colors.secondary }} />
                      {group.upcomingEvents} upcoming events
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chat sx={{ fontSize: 16, mr: 1, color: colors.secondary }} />
                      {group.recentDiscussions} discussions
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Work sx={{ fontSize: 16, mr: 1, color: colors.secondary }} />
                      {group.jobPostings} job opportunities
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="View Group">
                    <IconButton sx={{ color: colors.primary }}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton sx={{ color: colors.secondary }}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton sx={{ color: '#d32f2f' }}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Groups;