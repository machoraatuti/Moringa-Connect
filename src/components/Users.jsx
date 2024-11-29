import React, { useState } from 'react';
import { 
  Box, Grid, Card, Avatar, Typography, IconButton, TextField,
  Chip, Tooltip, Stack, Button, Menu, MenuItem
} from '@mui/material';
import { 
  Delete, Edit, Email, LinkedIn, Visibility, Work, School,
  Language, GitHub, FilterList, Add, MoreVert, CalendarMonth
} from '@mui/icons-material';

// Moringa color scheme
const colors = {
  primary: '#0A1F44', // Navy blue
  secondary: '#F05A28', // Orange
  background: '#FFF5F2', // Light peach
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const users = [
    {
      id: 1,
      name: 'mishael',
      avatar: 'https://via.placeholder.com/150',
      role: 'Software Engineer',
      company: 'Microsoft',
      location: 'Nairobi, Kenya',
      cohort: '2023',
      course: 'Software Engineering',
      specialization: 'Full Stack Development',
      status: 'Employed',
      socials: {
        github: 'github.com/johndoe',
        linkedin: 'linkedin.com/in/johndoe',
        portfolio: 'johndoe.dev'
      },
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      contributions: {
        mentoring: 5,
        talks: 2,
        blogPosts: 3
      }
    },
    {
      id: 2,
      name: 'vinter',
      avatar: 'https://via.placeholder.com/150',
      role: 'UX Designer',
      company: 'Safaricom',
      location: 'Mombasa, Kenya',
      cohort: '2023',
      course: 'UI/UX Design',
      specialization: 'Product Design',
      status: 'Freelancing',
      socials: {
        github: 'github.com/janesmith',
        linkedin: 'linkedin.com/in/janesmith',
        portfolio: 'janesmith.design'
      },
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      contributions: {
        mentoring: 3,
        talks: 1,
        blogPosts: 5
      }
    }
  ];

  const filteredUsers = users.filter(user => 
    Object.values(user).some(val => 
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ bgcolor: colors.background, minHeight: '100vh', p: 3 }}>
      {/* Header Section */}
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

      {/* Search and Filter Section */}
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

      {/* Alumni Cards */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} md={6} key={user.id}>
            <Card sx={{ 
              p: 3,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' },
              border: `1px solid ${colors.divider}`
            }}>
              {/* Header */}
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box display="flex" gap={2}>
                  <Avatar 
                    src={user.avatar} 
                    sx={{ 
                      width: 80, 
                      height: 80,
                      border: `3px solid ${colors.secondary}`
                    }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: colors.primary }}>
                      {user.name}
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

              {/* Education */}
              <Stack spacing={1} mb={2}>
                <Typography variant="subtitle2" sx={{ color: colors.primary }}>
                  Education
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <School sx={{ color: colors.secondary }} />
                  <Box>
                    <Typography variant="body2">
                      {user.course} - {user.specialization}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Cohort {user.cohort}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              {/* Skills */}
              <Box mb={2}>
                <Typography variant="subtitle2" sx={{ color: colors.primary, mb: 1 }}>
                  Skills
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {user.skills.map((skill) => (
                    <Chip 
                      key={skill}
                      label={skill}
                      size="small"
                      sx={{ 
                        bgcolor: colors.primary,
                        color: colors.white
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Community Contributions */}
              <Box mb={2}>
                <Typography variant="subtitle2" sx={{ color: colors.primary, mb: 1 }}>
                  Community Contributions
                </Typography>
                <Box display="flex" gap={2}>
                  <Chip 
                    label={`${user.contributions.mentoring} Mentees`}
                    size="small"
                    sx={{ bgcolor: colors.divider }}
                  />
                  <Chip 
                    label={`${user.contributions.talks} Talks`}
                    size="small"
                    sx={{ bgcolor: colors.divider }}
                  />
                  <Chip 
                    label={`${user.contributions.blogPosts} Posts`}
                    size="small"
                    sx={{ bgcolor: colors.divider }}
                  />
                </Box>
              </Box>

              {/* Actions */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Chip 
                    label={user.status}
                    size="small"
                    sx={{ 
                      bgcolor: user.status === 'Employed' ? '#4caf50' : colors.secondary,
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