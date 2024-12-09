// CreatePost.jsx
import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Select, MenuItem,
  IconButton
} from '@mui/material';
import {
  Close, AddPhotoAlternate, Delete
} from '@mui/icons-material';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2', 
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const CreatePost = ({ onClose }) => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
    image: null
  });

  const categories = [
    'Technology',
    'Career',
    'Education',
    'Events',
    'Projects',
    'Other'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostData({
        ...postData,
        image: URL.createObjectURL(file)
      });
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', margin: '20px auto', p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600 }}>
          Create Post
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Post Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: colors.secondary },
              '&.Mui-focused fieldset': { borderColor: colors.secondary }
            }
          }}
        />

        <Select
          value={postData.category}
          onChange={(e) => setPostData({ ...postData, category: e.target.value })}
          displayEmpty
          renderValue={selected => selected || "Select Category"}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>

        <TextField
          label="Write your post..."
          multiline
          rows={6}
          fullWidth
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
        />

        <Box sx={{ mt: 2 }}>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            hidden
            onChange={handleImageUpload}
          />
          <Button
            component="label"
            htmlFor="image-upload"
            startIcon={<AddPhotoAlternate />}
            variant="outlined"
            sx={{
              borderColor: colors.divider,
              color: colors.primary,
              '&:hover': {
                borderColor: colors.secondary,
                bgcolor: colors.divider
              }
            }}
          >
            Add Image
          </Button>
          {postData.image && (
            <Box sx={{ mt: 2, position: 'relative', width: 'fit-content' }}>
              <img 
                src={postData.image} 
                alt="Preview" 
                style={{ maxWidth: '200px', borderRadius: '8px' }} 
              />
              <IconButton
                onClick={() => setPostData({ ...postData, image: null })}
                sx={{ 
                  position: 'absolute', 
                  top: -10, 
                  right: -10,
                  bgcolor: colors.white,
                  '&:hover': { bgcolor: colors.divider }
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button 
            variant="outlined"
            onClick={onClose}
            sx={{ 
              color: colors.primary,
              borderColor: colors.primary,
              '&:hover': {
                borderColor: colors.primary,
                bgcolor: colors.divider
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: colors.secondary,
              '&:hover': { bgcolor: colors.primary }
            }}
          >
            Publish Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;