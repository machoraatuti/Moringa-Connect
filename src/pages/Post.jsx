import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CreatePost from './CreatePost';
import PostList from './PostList';

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      date: '2024-01-15',
      image: 'https://via.placeholder.com/150',
      title: 'Getting Started with React',
      category: 'Development',
      author: {
        name: 'Mishael Atuti',
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
        name: 'Vinter',
        avatar: 'https://via.placeholder.com/40',
        role: 'UX Designer'
      },
      likes: 32,
      comments: 8,
      views: 180
    }
  ]);

  const handleAddPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  const handleDeletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleLikePost = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Posts</Typography>
      <CreatePost onAddPost={handleAddPost} />
      <PostList posts={posts} onDeletePost={handleDeletePost} onLikePost={handleLikePost} />
    </Box>
  );
};

export default Posts;
