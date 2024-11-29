import React, { useState } from 'react';
import { 
  Box, Grid, Card, CardContent, CardMedia, Typography,
  IconButton, Chip, useTheme, useMediaQuery, TextField, 
  Button, Avatar, Select, MenuItem, InputAdornment,
  Divider
} from '@mui/material';
import { 
  Delete, Edit, Search, Add,
  ThumbUp, Comment, Visibility
} from '@mui/icons-material';

// Color scheme
const colors = {
  primary: '#0A1F44', // Navy blue
  secondary: '#F05A28', // Orange
  background: '#FFF5F2', // Light peach
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

// Shared styles
const cardStyles = {
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease',
  '&:hover': { 
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
  }
};

const mediaStyles = {
  borderRadius: '12px',
  margin: '12px',
  overflow: 'hidden',
  height: '180px'
};

const Posts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const posts = [
    {
      id: 1,
      date: '2024-01-15',
      image: 'https://via.placeholder.com/150',
      title: 'Getting Started with React',
      category: 'Development',
      author: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
        role: 'Software Engineer'
      },
      likes: 45,
      comments: 12,
      views: 230
    },
    {
      id: 2,
      date: '2024-01-16',
      image: 'https://via.placeholder.com/150',
      title: 'UI Design Tips',
      category: 'Design',
      author: {
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/40',
        role: 'UX Designer'
      },
      likes: 32,
      comments: 8,
      views: 180
    }
  ];

  const categories = ['all', 'Development', 'Design', 'Career', 'Events'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const MobileView = () => (
    <Grid container spacing={2}>
      {filteredPosts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <Card sx={cardStyles}>
            <Box sx={{ p: 2, pb: 0 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar 
                  src={post.author.avatar} 
                  sx={{ 
                    mr: 1.5, 
                    width: 48, 
                    height: 48,
                    border: `2px solid ${colors.secondary}`
                  }} 
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: colors.primary, fontWeight: 600 }}>
                    {post.author.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {post.author.role}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <CardMedia
              component="img"
              image={post.image}
              alt={post.title}
              sx={mediaStyles}
            />

            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 600 }}>
                {post.title}
              </Typography>

              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Chip 
                  label={post.category} 
                  size="small"
                  sx={{ 
                    bgcolor: colors.primary, 
                    color: colors.white,
                    borderRadius: '20px',
                    fontSize: '0.75rem'
                  }}
                />
                <Box display="flex" alignItems="center" gap={2} ml="auto">
                  <Box display="flex" alignItems="center">
                    <ThumbUp sx={{ fontSize: 16, mr: 0.5, color: colors.secondary }} />
                    <Typography variant="caption">{post.likes}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Comment sx={{ fontSize: 16, mr: 0.5, color: colors.secondary }} />
                    <Typography variant="caption">{post.comments}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Visibility sx={{ fontSize: 16, mr: 0.5, color: colors.secondary }} />
                    <Typography variant="caption">{post.views}</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  {post.date}
                </Typography>
                <Box>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: colors.primary,
                      '&:hover': { bgcolor: `${colors.primary}10` }
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      color: '#d32f2f',
                      '&:hover': { bgcolor: '#d32f2f10' }
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const DesktopView = () => (
    <Grid container spacing={3}>
      {filteredPosts.map((post) => (
        <Grid item xs={12} md={6} key={post.id}>
          <Card sx={cardStyles}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  src={post.author.avatar} 
                  sx={{ 
                    width: 48, 
                    height: 48,
                    border: `2px solid ${colors.secondary}`
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: colors.primary, fontWeight: 600 }}>
                    {post.author.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.author.role}
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ ml: 'auto' }}
                >
                  {post.date}
                </Typography>
              </Box>

              <CardMedia
                component="img"
                image={post.image}
                alt={post.title}
                sx={mediaStyles}
              />

              <CardContent>
                <Box mb={2}>
                  <Typography variant="h6" gutterBottom sx={{ color: colors.primary, fontWeight: 600 }}>
                    {post.title}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip 
                      label={post.category} 
                      size="small"
                      sx={{ 
                        bgcolor: colors.primary, 
                        color: colors.white,
                        borderRadius: '20px',
                        fontSize: '0.75rem'
                      }}
                    />
                  </Box>
                </Box>

                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{
                    p: 1.5,
                    bgcolor: colors.background,
                    borderRadius: '12px'
                  }}
                >
                  <Box display="flex" alignItems="center" gap={3}>
                    <Box display="flex" alignItems="center">
                      <ThumbUp sx={{ fontSize: 18, mr: 0.5, color: colors.secondary }} />
                      <Typography variant="body2">{post.likes}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Comment sx={{ fontSize: 18, mr: 0.5, color: colors.secondary }} />
                      <Typography variant="body2">{post.comments}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Visibility sx={{ fontSize: 18, mr: 0.5, color: colors.secondary }} />
                      <Typography variant="body2">{post.views}</Typography>
                    </Box>
                  </Box>

                  <Box>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: colors.primary,
                        '&:hover': { bgcolor: `${colors.primary}10` }
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: '#d32f2f',
                        '&:hover': { bgcolor: '#d32f2f10' }
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box p={2} sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 600 }}>
          Posts
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ 
            bgcolor: colors.secondary, 
            '&:hover': { bgcolor: colors.primary },
            borderRadius: '8px'
          }}
        >
          Create Post
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          placeholder="Search posts..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: colors.white,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&:hover fieldset': { borderColor: colors.secondary },
              '&.Mui-focused fieldset': { borderColor: colors.secondary },
            }
          }}
        />
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ 
            minWidth: 120, 
            bgcolor: colors.white,
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.divider
            }
          }}
        >
          {categories.map(category => (
            <MenuItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {isMobile ? <MobileView /> : <DesktopView />}
    </Box>
  );
};

export default Posts;