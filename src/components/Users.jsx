import React, { useState } from 'react';
import { 
  Box, Grid, Card, Avatar, Typography, IconButton, TextField,
  Chip, Tooltip, useTheme, useMediaQuery
} from '@mui/material';
import { 
  Delete, Edit, Email, LinkedIn, Visibility,
  School, Work, CalendarMonth
} from '@mui/icons-material';

const Alumni = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');

  const alumni = [
    {
      id: 1,
      name: 'Sarah Johnson',
      image: 'https://via.placeholder.com/150',
      email: 'sarah.j@email.com',
      phone: '+1 234-567-8900',
      enrollmentDate: '2023-01-15',
      graduationDate: '2023-12-15',
      course: 'Software Engineering',
      specialization: 'Full Stack Development',
      currentRole: 'Junior Software Engineer',
      company: 'Tech Solutions Inc',
      location: 'New York, USA',
      linkedIn: 'linkedin.com/sarahj',
      status: 'Active',
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      projects: [
        {
          name: 'E-commerce Platform',
          url: 'github.com/sarahj/ecommerce'
        }
      ],
      certificates: [
        {
          name: 'Advanced Web Development',
          issueDate: '2023-12-15'
        }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      image: 'https://via.placeholder.com/150',
      email: 'michael.c@email.com',
      phone: '+1 234-567-8901',
      enrollmentDate: '2023-02-01',
      graduationDate: '2023-12-30',
      course: 'Software Engineering',
      specialization: 'Cloud Computing',
      currentRole: 'Cloud Engineer',
      company: 'Cloud Tech Corp',
      location: 'San Francisco, USA',
      linkedIn: 'linkedin.com/michaelc',
      status: 'Active',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Python'],
      projects: [
        {
          name: 'Cloud Migration Tool',
          url: 'github.com/michaelc/cloudmigrate'
        }
      ],
      certificates: [
        {
          name: 'AWS Solutions Architect',
          issueDate: '2023-12-30'
        }
      ]
    }
  ];

  const filteredAlumni = alumni.filter(alum => 
    Object.values(alum).some(val => 
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box p={2}>
      <TextField
        fullWidth
        label="Search Alumni"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      
      <Grid container spacing={3}>
        {filteredAlumni.map((alum) => (
          <Grid item xs={12} md={6} key={alum.id}>
            <Card>
              <Box p={3}>
                {/* Header */}
                <Box display="flex" mb={2}>
                  <Avatar src={alum.image} sx={{ width: 70, height: 70 }} />
                  <Box ml={2}>
                    <Typography variant="h6">{alum.name}</Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {alum.currentRole} at {alum.company}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      <CalendarMonth sx={{ fontSize: 16, mr: 0.5 }} />
                      Enrolled: {new Date(alum.enrollmentDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <School sx={{ fontSize: 16, mr: 0.5 }} />
                      Graduated: {new Date(alum.graduationDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Course Info */}
                <Box mb={2}>
                  <Typography variant="subtitle2" gutterBottom>Course Details</Typography>
                  <Chip 
                    label={alum.course} 
                    color="primary" 
                    size="small" 
                    sx={{ mr: 1 }} 
                  />
                  <Chip 
                    label={alum.specialization} 
                    color="secondary" 
                    size="small" 
                  />
                </Box>

                {/* Skills */}
                <Box mb={2}>
                  <Typography variant="subtitle2" gutterBottom>Skills</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {alum.skills.map((skill) => (
                      <Chip 
                        key={skill} 
                        label={skill} 
                        size="small" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </Box>

                {/* Actions */}
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Tooltip title="View Profile">
                    <IconButton size="small"><Visibility /></IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small"><Edit /></IconButton>
                  </Tooltip>
                  <Tooltip title="Email">
                    <IconButton size="small"><Email /></IconButton>
                  </Tooltip>
                  <Tooltip title="LinkedIn">
                    <IconButton size="small"><LinkedIn /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error"><Delete /></IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Alumni;