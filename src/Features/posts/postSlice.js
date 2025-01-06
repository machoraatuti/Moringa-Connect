// src/features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Sample mock data to simulate a database
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'React is a powerful library for building user interfaces...',
    category: 'Technology',
    author: {
      id: 'user1',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40'
    },
    image: 'https://via.placeholder.com/600x400',
    createdAt: new Date().toISOString(),
    likes: 15,
    likedBy: ['user2', 'user3'],
    comments: [
      {
        id: 'c1',
        content: 'Great introduction!',
        author: {
          id: 'user2',
          name: 'Jane Smith',
          avatar: 'https://via.placeholder.com/40'
        },
        createdAt: new Date().toISOString()
      }
    ],
    views: 230,
    tags: ['react', 'javascript', 'frontend']
  }
];

// Helper function to simulate API latency
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to safely convert FormData to a regular object
const formDataToObject = (formData) => {
  const obj = {};
  formData.forEach((value, key) => {
    if (key === 'image') {
      obj[key] = value instanceof File ? true : value;
    } else {
      obj[key] = value;
    }
  });
  return obj;
};

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      await delay(1000);
      return mockPosts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating new posts
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (formData, { rejectWithValue }) => {
    try {
      const postData = formDataToObject(formData);
      await delay(1500);

      if (!postData.title?.trim() || !postData.content?.trim() || !postData.category) {
        throw new Error('Please fill in all required fields');
      }

      const newPost = {
        id: Date.now().toString(),
        ...postData,
        author: {
          id: 'currentUser',
          name: 'Current User',
          avatar: 'https://via.placeholder.com/40'
        },
        image: postData.image ? 'https://via.placeholder.com/600x400' : null,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        comments: [],
        views: 0,
        tags: []
      };

      return newPost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for handling post likes
export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      await delay(500);
      return { postId, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding comments
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, content, userId }, { rejectWithValue }) => {
    try {
      await delay(500);
      const newComment = {
        id: `c${Date.now()}`,
        content,
        author: {
          id: userId,
          name: 'Current User',
          avatar: 'https://via.placeholder.com/40'
        },
        createdAt: new Date().toISOString()
      };
      return { postId, comment: newComment };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting comments
export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await delay(500);
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for editing posts
export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postId, updatedData }, { rejectWithValue }) => {
    try {
      await delay(1000);
      return { postId, updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting posts
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await delay(1000);
      return postId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state definition with all required fields
const initialState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null,
  createPostStatus: 'idle',
  fetchPostsStatus: 'idle',
  likeStatus: 'idle',
  commentStatus: 'idle',
  deleteStatus: 'idle',
  editStatus: 'idle',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0
  }
};

// Create the posts slice with all reducers and extra reducers
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPostStatus: (state) => {
      state.createPostStatus = 'idle';
      state.error = null;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.error = null;
      state.currentPost = null;
    },
    incrementViews: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.views = (post.views || 0) + 1;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPostsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchPostsStatus = 'succeeded';
        const newPosts = action.payload.filter(
          newPost => !state.posts.some(existingPost => existingPost.id === newPost.id)
        );
        state.posts = [...state.posts, ...newPosts];
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPostsStatus = 'failed';
        state.error = action.payload;
      })
      // Handle create post
      .addCase(createPost.pending, (state) => {
        state.createPostStatus = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPostStatus = 'succeeded';
        state.posts.unshift(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPostStatus = 'failed';
        state.error = action.payload;
      })
      // Handle like toggle
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          const hasLiked = post.likedBy.includes(userId);
          if (hasLiked) {
            post.likedBy = post.likedBy.filter(id => id !== userId);
            post.likes--;
          } else {
            post.likedBy.push(userId);
            post.likes++;
          }
        }
      })
      // Handle add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.comments.push(comment);
        }
      })
      // Handle delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.comments = post.comments.filter(c => c.id !== commentId);
        }
      })
      // Handle edit post
      .addCase(editPost.fulfilled, (state, action) => {
        const { postId, updatedData } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          Object.assign(post, updatedData);
        }
      })
      // Handle delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  }
});

// Export actions
export const {
  resetPostStatus,
  setCurrentPost,
  clearErrors,
  clearPosts,
  incrementViews
} = postsSlice.actions;

// Export selectors with proper error handling
export const selectAllPosts = (state) => state.posts?.posts || [];
export const selectPostById = (state, postId) => 
  state.posts?.posts.find(post => post.id === postId);
export const selectPostsStatus = (state) => ({
  createPostStatus: state.posts?.createPostStatus || 'idle',
  fetchPostsStatus: state.posts?.fetchPostsStatus || 'idle',
  likeStatus: state.posts?.likeStatus || 'idle',
  commentStatus: state.posts?.commentStatus || 'idle',
  deleteStatus: state.posts?.deleteStatus || 'idle',
  editStatus: state.posts?.editStatus || 'idle',
  error: state.posts?.error || null
});

// Export the reducer as default
export default postsSlice.reducer;