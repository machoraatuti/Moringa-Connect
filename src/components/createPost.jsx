// CreatePost.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, TextField, Button, Select, MenuItem,
  IconButton, Alert, Snackbar, CircularProgress
} from '@mui/material';
import {
  Close, AddPhotoAlternate, Delete
} from '@mui/icons-material';
import { createPost } from '../Features/posts/postSlice';

// Theme colors for consistent styling
const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2', 
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const CreatePost = ({ onClose }) => {
  const dispatch = useDispatch();
  
  // Get posts state from Redux store
  const postsState = useSelector((state) => state.posts) || {};
  const { createPostStatus, error } = postsState;

  // Local state for form data
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
    image: null // Stores the actual File object
  });

  // Separate state for image preview URL
  const [imagePreview, setImagePreview] = useState(null);
  
  // State for notification handling
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Available categories for the dropdown
  const categories = [
    'Technology',
    'Career',
    'Education',
    'Events',
    'Projects',
    'Other'
  ];

  // Handle image file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Store the actual file in postData
      setPostData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create and store the preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!postData.title || !postData.content || !postData.category) {
      setSnackbarMessage('Please fill in all required fields');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Create FormData object for submission
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('category', postData.category);
    
    // Only append image if it exists
    if (postData.image) {
      formData.append('image', postData.image);
    }

    try {
      await dispatch(createPost(formData)).unwrap();
      // Handle successful creation
      onClose();
    } catch (err) {
      setSnackbarMessage('Failed to create post');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Clean up image preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Monitor post creation status
  useEffect(() => {
    if (createPostStatus === 'succeeded') {
      setSnackbarMessage('Post created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else if (createPostStatus === 'failed') {
      setSnackbarMessage(error || 'Failed to create post');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [createPostStatus, error]);

  return (
    <Box sx={{ 
      maxWidth: '800px', 
      margin: '20px auto', 
      p: { xs: 2, sm: 3 },
      width: '100%' 
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: colors.primary, 
            fontWeight: 600,
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}
        >
          Create Post
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* Form Fields */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Post Title"
          required
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
          required
          renderValue={selected => selected || "Select Category"}
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>

        <TextField
          label="Write your post..."
          multiline
          rows={6}
          required
          fullWidth
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
        />

        {/* Image Upload Section */}
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
          
          {/* Image Preview */}
          {imagePreview && (
            <Box sx={{ 
              mt: 2, 
              position: 'relative', 
              width: 'fit-content',
              maxWidth: '100%'
            }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px' 
                }} 
              />
              <IconButton
                onClick={() => {
                  URL.revokeObjectURL(imagePreview);
                  setImagePreview(null);
                  setPostData(prev => ({
                    ...prev,
                    image: null
                  }));
                }}
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

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 2, 
          mt: 2,
          flexWrap: { xs: 'wrap', sm: 'nowrap' }
        }}>
          <Button 
            variant="outlined"
            onClick={onClose}
            sx={{ 
              color: colors.primary,
              borderColor: colors.primary,
              '&:hover': {
                borderColor: colors.primary,
                bgcolor: colors.divider
              },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={createPostStatus === 'loading'}
            sx={{
              bgcolor: colors.secondary,
              '&:hover': { bgcolor: colors.primary },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            {createPostStatus === 'loading' ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Publish Post'
            )}
          </Button>
        </Box>
      </Box>

      {/* Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreatePost;