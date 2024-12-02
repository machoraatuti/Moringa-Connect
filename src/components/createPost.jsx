import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip
} from '@mui/material';
import {
  Close,
  AddPhotoAlternate,
  AttachFile,
  Delete
} from '@mui/icons-material';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28', 
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
    image: null
  });

  const [tagInput, setTagInput] = useState('');

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
    <Box sx={{ 
      maxWidth: '800px', 
      margin: '20px auto',
      p: 3,
      bgcolor: colors.white,
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 600 }}>
          Create Post
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Title */}
        <TextField
          label="Post Title"
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: colors.secondary },
              '&.Mui-focused fieldset': { borderColor: colors.secondary }
            }
          }}
        />

        {/* Category */}
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Content */}
        <TextField
          label="Write your post..."
          multiline
          rows={6}
          fullWidth
          variant="outlined"
        />

        {/* Tags */}
        <Box>
          <TextField
            label="Add tags (Press Enter)"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="Example Tag"
              onDelete={() => {}}
              sx={{
                bgcolor: colors.divider,
                '& .MuiChip-deleteIcon': {
                  color: colors.primary,
                  '&:hover': { color: colors.secondary }
                }
              }}
            />
          </Box>
        </Box>

        {/* Image Upload */}
        <Box sx={{ mt: 2 }}>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            hidden
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
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button 
            variant="outlined"
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