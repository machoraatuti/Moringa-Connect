import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Typography, TextField, Button, Select, MenuItem,
  IconButton, Snackbar, Alert
} from '@mui/material';
import {
  Close, AddPhotoAlternate, Delete
} from '@mui/icons-material';
import { createPost } from '../Features/posts/postSlice';

// Define colors directly in the component
const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2', 
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const CreatePost = ({ onClose }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
    image: null
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const categories = [
    'Technology', 'Career', 'Education', 'Events', 'Projects', 'Other'
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPostData({
        ...postData,
        image: file
      });
    }
  };

  const handleSubmit = async () => {
    if (!postData.title || !postData.content || !postData.category) {
      setSnackbarMessage('Please fill out all required fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      // Convert postData to plain object
      const submitData = {
        title: postData.title,
        content: postData.content,
        category: postData.category,
        tags: postData.tags,
        image: postData.image ? URL.createObjectURL(postData.image) : null
      };

      // Dispatch createPost action
      await dispatch(createPost(submitData)).unwrap();

      setSnackbarMessage('Post published successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      
      // Reset form
      setPostData({ title: '', content: '', category: '', tags: [], image: null });
      onClose();
    } catch (error) {
      setSnackbarMessage(error || 'An error occurred while publishing the post.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
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
                src={URL.createObjectURL(postData.image)} 
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
            onClick={handleSubmit}
            sx={{
              bgcolor: colors.secondary,
              '&:hover': { bgcolor: colors.primary }
            }}
          >
            Publish Post
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreatePost;