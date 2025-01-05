import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPosts,
  selectAllPosts,
  selectPostsStatus
} from '../Features/posts/postsSlice';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Chip
} from '@mui/material';
import PostCard from './PostCard';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const { fetchPostsStatus, error } = useSelector(selectPostsStatus);

  // Fetch posts when component mounts
  useEffect(() => {
    if (fetchPostsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchPostsStatus]);

  // Show loading state
  if (fetchPostsStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (fetchPostsStatus === 'failed') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Failed to load posts
        </Typography>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
      </Box>
    );
  }

  // If no posts, show message
  if (posts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">
          No posts yet. Be the first to create one!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {posts.map((post) => (
        <Grid item xs={12} md={6} lg={4} key={post.id}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsList;