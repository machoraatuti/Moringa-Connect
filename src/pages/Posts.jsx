// src/pages/Posts.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Grid, Typography, TextField, Button, Select, 
  MenuItem, InputAdornment, Dialog, DialogContent, 
  Snackbar, Alert
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import CreatePost from '../components/createPost';
import { fetchPosts, selectAllPosts } from '../Features/posts/postSlice';
import PostCard from '../Features/posts/postCard'; // We'll create this separately

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  // Fetch posts when component mounts
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const categories = ['all', 'Technology', 'Career', 'Education', 'Events', 'Projects', 'Other'];

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle successful post creation
  const handlePostCreated = () => {
    setOpenCreatePost(false);
    dispatch(fetchPosts()); // Refresh the posts list
  };

  return (
    <Box p={2} sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" sx={{ color: colors.primary, fontWeight: 600 }}>
          Posts
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreatePost(true)}
          sx={{ 
            bgcolor: colors.secondary,
            '&:hover': { bgcolor: colors.primary },
            borderRadius: '8px'
          }}
        >
          Create Post
        </Button>
      </Box>

      {/* Search and Filter Section */}
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
            borderRadius: '8px'
          }}
        >
          {categories.map(category => (
            <MenuItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Posts Grid */}
      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
        {filteredPosts.length === 0 && (
          <Box sx={{ p: 3, width: '100%', textAlign: 'center' }}>
            <Typography variant="h6">
              No posts found. {searchTerm || categoryFilter !== 'all' ? 'Try adjusting your filters.' : 'Be the first to create one!'}
            </Typography>
          </Box>
        )}
      </Grid>

      {/* Create Post Dialog */}
      <Dialog 
        open={openCreatePost} 
        onClose={() => setOpenCreatePost(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogContent>
          <CreatePost onClose={handlePostCreated} />
        </DialogContent>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenErrorSnackbar(false)} 
          severity="error"
        >
          Please select a category to search.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Posts;