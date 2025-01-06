// src/components/PostsList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchPosts, 
  selectAllPosts, 
  selectFetchPostsStatus 
} from '../Features/posts/postSlice';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography,
  CircularProgress
} from '@mui/material';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const fetchStatus = useSelector(selectFetchPostsStatus);

  // Fetch posts when component mounts
  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, fetchStatus]);

  // Show loading state
  if (fetchStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If no posts, show message
  if (posts.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No posts yet. Be the first to create one!</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} md={6} lg={4} key={post.id}>
          <Card sx={{ height: '100%' }}>
            {post.image && (
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
            )}
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Category: {post.category}
              </Typography>
              <Typography variant="caption" display="block">
                Posted: {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsList;