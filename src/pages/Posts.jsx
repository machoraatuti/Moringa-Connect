import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, Grid, Typography, Button, TextField, 
  Select, MenuItem, InputAdornment, Snackbar, Alert 
} from '@mui/material';
import { 
  Add, Search 
} from '@mui/icons-material';
import { 
  fetchPosts, 
  createPost, 
  selectAllPosts, 
  selectPostsStatus 
} from '../Features/posts/postSlice';
import PostCard from '../Features/posts/postCard';
import CreatePost from '../components/createPost';

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
  const { fetchPostsStatus, error } = useSelector(selectPostsStatus);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const categories = ['all', 'Development', 'Design', 'Career', 'Events', 'Technology'];

  useEffect(() => {
    if (fetchPostsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchPostsStatus]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleButtonClick = () => {
    if (!categoryFilter) {
      setOpenErrorSnackbar(true);
    } else {
      console.log(`Searching for posts in category: ${categoryFilter}`);
    }
  };

  const handleCreatePost = (postData) => {
    dispatch(createPost(postData));
    setOpenCreatePost(false);
  };

  return (
    <Box p={2} sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
          sx={{
            bgcolor: colors.secondary,
            '&:hover': { bgcolor: colors.primary },
            borderRadius: '8px'
          }}
        >
          Search
        </Button>
      </Box>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          Please select a category to search.
        </Alert>
      </Snackbar>

      {fetchPostsStatus === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Typography>Loading posts...</Typography>
        </Box>
      )}

      {fetchPostsStatus === 'failed' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Typography color="error">Failed to load posts: {error}</Typography>
        </Box>
      )}

      {filteredPosts.length === 0 && fetchPostsStatus === 'succeeded' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Typography>No posts found.</Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>

      {openCreatePost && (
        <CreatePost 
          open={openCreatePost} 
          onClose={() => setOpenCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      )}
    </Box>
  );
};

export default Posts;