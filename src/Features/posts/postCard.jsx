// src/components/PostCard.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Card, CardContent, CardMedia, Typography, Box,
  Avatar, IconButton, Chip, Collapse, Dialog, 
  DialogTitle, DialogContent, DialogActions,
  Button, TextField, Alert, Snackbar, CircularProgress
} from '@mui/material';
import { 
  Delete, Edit, ThumbUp, Comment, 
  Visibility, Close 
} from '@mui/icons-material';
import { 
  toggleLike, 
  deletePost, 
  editPost, 
  incrementViews,
  addComment
} from '../posts/postSlice';

// Theme colors for consistent styling
const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  
  // Mock current user (replace with actual auth state in production)
  const currentUser = { id: 'currentUser' };

  // UI State Management
  const [showComments, setShowComments] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [newComment, setNewComment] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Loading States
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notification State
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Check if current user has liked the post
  const hasLiked = post.likedBy?.includes(currentUser.id);

  // Handle view counting
  useEffect(() => {
    dispatch(incrementViews(post.id));
  }, [dispatch, post.id]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle Like Action
  const handleLike = async () => {
    try {
      setIsLiking(true);
      await dispatch(toggleLike({ 
        postId: post.id, 
        userId: currentUser.id 
      })).unwrap();
    } catch (error) {
      console.error('Failed to like post:', error);
      setNotification({
        open: true,
        message: 'Failed to update like status',
        severity: 'error'
      });
    } finally {
      setIsLiking(false);
    }
  };

  // Handle Edit Action
  const handleEdit = async () => {
    try {
      if (!editedContent.trim()) return;
      
      setIsEditing(true);
      await dispatch(editPost({
        postId: post.id,
        updatedData: { 
          content: editedContent,
          updatedAt: new Date().toISOString() 
        }
      })).unwrap();
      
      setShowEditDialog(false);
      setNotification({
        open: true,
        message: 'Post updated successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to edit post:', error);
      setNotification({
        open: true,
        message: 'Failed to update post',
        severity: 'error'
      });
    } finally {
      setIsEditing(false);
    }
  };

  // Handle Delete Action
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deletePost(post.id)).unwrap();
      setDeleteConfirmOpen(false);
      setNotification({
        open: true,
        message: 'Post deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to delete post:', error);
      setNotification({
        open: true,
        message: 'Failed to delete post',
        severity: 'error'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Comment Action
  const handleAddComment = async () => {
    try {
      if (!newComment.trim()) return;
      
      setIsCommenting(true);
      await dispatch(addComment({
        postId: post.id,
        content: newComment.trim(),
        userId: currentUser.id
      })).unwrap();
      
      setNewComment('');
      setNotification({
        open: true,
        message: 'Comment added successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to add comment:', error);
      setNotification({
        open: true,
        message: 'Failed to add comment',
        severity: 'error'
      });
    } finally {
      setIsCommenting(false);
    }
  };

  // Close notification helper
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Card sx={{ 
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        '&:hover': { 
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }
      }}>
        {/* Author Section */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={post.author.avatar} 
            sx={{ 
              width: 48, 
              height: 48,
              border: `2px solid ${colors.secondary}`
            }}
          />
          <Box>
            <Typography variant="subtitle2" sx={{ 
              color: colors.primary, 
              fontWeight: 600 
            }}>
              {post.author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.createdAt)}
            </Typography>
          </Box>
        </Box>

        {/* Post Content */}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          
          {post.image && (
            <CardMedia
              component="img"
              height="200"
              image={post.image}
              alt={post.title}
              sx={{ borderRadius: 2, mb: 2 }}
            />
          )}

          <Typography variant="body2" color="text.secondary" paragraph>
            {post.content}
          </Typography>

          <Chip 
            label={post.category}
            size="small"
            sx={{ 
              bgcolor: colors.primary,
              color: colors.white
            }}
          />

          {/* Interaction Section */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2 
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                size="small"
                onClick={handleLike}
                disabled={isLiking}
                startIcon={
                  isLiking ? (
                    <CircularProgress size={16} />
                  ) : (
                    <ThumbUp color={hasLiked ? "secondary" : "inherit"} />
                  )
                }
              >
                {post.likes || 0}
              </Button>

              <Button
                size="small"
                onClick={() => setShowComments(!showComments)}
                startIcon={<Comment />}
              >
                {post.comments?.length || 0}
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Visibility fontSize="small" />
                <Typography variant="body2">
                  {post.views || 0}
                </Typography>
              </Box>
            </Box>

            {post.author.id === currentUser.id && (
              <Box>
                <IconButton
                  size="small"
                  onClick={() => setShowEditDialog(true)}
                  disabled={isEditing}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setDeleteConfirmOpen(true)}
                  disabled={isDeleting}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Comments Section */}
          <Collapse in={showComments}>
            <Box sx={{ mt: 2 }}>
              {post.comments?.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    bgcolor: colors.background,
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar
                      src={comment.author.avatar}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography variant="subtitle2">
                      {comment.author.name}
                    </Typography>
                    <Typography variant="caption" sx={{ ml: 'auto' }}>
                      {formatDate(comment.createdAt)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {comment.content}
                  </Typography>
                </Box>
              ))}

              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={isCommenting}
                />
                <Button
                  variant="contained"
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isCommenting}
                >
                  {isCommenting ? (
                    <CircularProgress size={24} />
                  ) : (
                    'Post'
                  )}
                </Button>
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        open={showEditDialog}
        onClose={() => !isEditing && setShowEditDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            disabled={isEditing}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowEditDialog(false)}
            disabled={isEditing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            variant="contained"
            disabled={!editedContent.trim() || isEditing}
          >
            {isEditing ? (
              <CircularProgress size={24} />
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => !isDeleting && setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this post? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <CircularProgress size={24} />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          elevation={6}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostCard;