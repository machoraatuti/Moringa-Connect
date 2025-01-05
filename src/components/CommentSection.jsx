// components/CommentSection.jsx
import React, { useState } from 'react';
import {
  Box, TextField, Button, Avatar, Typography,
  Divider, IconButton
} from '@mui/material';
import { Send, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addComment } from '../features/posts/postsSlice';

const CommentSection = ({ postId, comments = [] }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      await dispatch(addComment({ 
        postId, 
        comment: newComment.trim() 
      })).unwrap();
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Comments ({comments.length})
      </Typography>
      
      {/* Comment List */}
      <Box sx={{ mb: 2 }}>
        {comments.map((comment) => (
          <Box key={comment.id} sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <Avatar
              src={comment.author.avatar}
              sx={{ width: 32, height: 32 }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle2">
                  {comment.author.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body2">{comment.content}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Add Comment Form */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <Avatar
          sx={{ width: 32, height: 32 }}
          src="https://via.placeholder.com/40"
        />
        <TextField
          fullWidth
          size="small"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmitComment();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!newComment.trim()}
          onClick={handleSubmitComment}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;