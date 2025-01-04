import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select } from '@mui/material';

const categories = ['Development', 'Design', 'Career', 'Events'];

const CreatePost = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && category && author) {
      const newPost = {
        id: Date.now(),
        title,
        category,
        author: {
          name: author,
          avatar: `https://ui-avatars.com/api/?name=${author}&background=random`,
          role: 'User'
        },
        date: new Date().toISOString().split('T')[0],
        image: image || 'https://via.placeholder.com/150',
        likes: 0,
        comments: 0,
        views: 0
      };
      onAddPost(newPost);
      setTitle('');
      setCategory('');
      setAuthor('');
      setImage('');
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#FFF5F2', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Create a New Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>Select Category</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
        <TextField
          label="Author Name"
          fullWidth
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          fullWidth
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Create Post</Button>
      </form>
    </Box>
  );
};

export default CreatePost;
