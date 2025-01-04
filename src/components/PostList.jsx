import React from 'react';
import {
  Box, Card, CardContent, CardMedia, Typography,
  IconButton, Chip, Divider, Avatar
} from '@mui/material';
import { ThumbUp, Delete } from '@mui/icons-material';

const PostList = ({ posts, onDeletePost, onLikePost }) => {
  return (
    <Box>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Avatar src={post.author.avatar} sx={{ mr: 2 }} />
            <Box>
              <Typography variant="subtitle1">{post.author.name}</Typography>
              <Typography variant="caption" color="textSecondary">{post.author.role}</Typography>
            </Box>
            <Typography variant="caption" sx={{ ml: 'auto' }}>{post.date}</Typography>
          </Box>
          <CardMedia component="img" height="140" image={post.image} alt={post.title} />
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Chip label={post.category} color="primary" size="small" sx={{ mt: 1 }} />
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Box>
                <IconButton onClick={() => onLikePost(post.id)}>
                  <ThumbUp color="primary" />
                </IconButton>
                <Typography component="span">{post.likes}</Typography>
              </Box>
              <IconButton onClick={() => onDeletePost(post.id)}>
                <Delete color="error" />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostList;
