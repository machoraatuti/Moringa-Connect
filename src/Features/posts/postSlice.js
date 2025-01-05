import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Simulate API delay
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Sample initial posts
export const mockPosts = [
  {
    id: generateId(),
    title: "Getting Started with React",
    content: "React is a powerful library for building user interfaces...",
    category: "Technology",
    author: {
      id: "user1",
      name: "John Doe",
      avatar: "https://via.placeholder.com/40"
    },
    image: "https://via.placeholder.com/600x400",
    createdAt: new Date().toISOString(),
    likes: 15,
    comments: [
      {
        id: generateId(),
        author: {
          id: "user2",
          name: "Jane Smith",
          avatar: "https://via.placeholder.com/40"
        },
        content: "Great introduction to React!",
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: generateId(),
    title: "Career Development Tips",
    content: "Building a successful career requires consistent effort...",
    category: "Career",
    author: {
      id: "user2",
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/40"
    },
    image: "https://via.placeholder.com/600x400",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 23,
    comments: []
  }
];

// Async Thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      await delay();
      return mockPosts;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      await delay(500);

      if (!postData.title?.trim() || !postData.content?.trim() || !postData.category) {
        throw new Error('Please fill in all required fields');
      }

      const newPost = {
        id: generateId(),
        ...postData,
        author: {
          id: 'currentUser',
          name: 'Current User',
          avatar: 'https://via.placeholder.com/40'
        },
        image: postData.image || 'https://via.placeholder.com/600x400',
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: []
      };

      return newPost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await delay(500);
      return postId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete post');
    }
  }
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      await delay(500);
      const newComment = {
        id: generateId(),
        author: {
          id: 'currentUser',
          name: 'Current User',
          avatar: 'https://via.placeholder.com/40'
        },
        content,
        createdAt: new Date().toISOString()
      };
      return { postId, comment: newComment };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add comment');
    }
  }
);

export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async ({ postId }, { rejectWithValue, getState }) => {
    try {
      await delay(500);
      const state = getState();
      const post = selectPostById(state, postId);
      
      return { 
        postId, 
        likes: post.likes + (post.likes === 15 ? -1 : 1)
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to toggle like');
    }
  }
);

export const incrementViews = createAsyncThunk(
  'posts/incrementViews',
  async (postId, { rejectWithValue }) => {
    try {
      await delay(100);
      return postId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to increment views');
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postId, updatedData }, { rejectWithValue }) => {
    try {
      await delay(500);
      return { 
        postId, 
        updatedData 
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to edit post');
    }
  }
);

// Initial State
const initialState = {
  posts: [],
  loading: false,
  error: null,
  currentPost: null,
  createPostStatus: 'idle',
  fetchPostsStatus: 'idle'
};

// Posts Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPostStatus: (state) => {
      state.createPostStatus = 'idle';
      state.error = null;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.fetchPostsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchPostsStatus = 'succeeded';
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchPostsStatus = 'failed';
        state.error = action.payload;
      })
      // Create Post
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
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      // In the extraReducers, add:
.addCase(incrementViews.fulfilled, (state, action) => {
  const post = state.posts.find(p => p.id === action.payload);
  if (post) {
    post.views = (post.views || 0) + 1;
  }
})
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.comments.push(comment);
        }
      })
      // Toggle Like
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        const post = state.posts.find(p => p.id === postId);
        if (post) {
          post.likes = likes;
        }
      })
      // Edit Post
      .addCase(editPost.fulfilled, (state, action) => {
        const { postId, updatedData } = action.payload;
        const postIndex = state.posts.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
          state.posts[postIndex] = {
            ...state.posts[postIndex],
            ...updatedData
          };
        }
      });
  }
});

// Robust Selectors
export const selectPostsState = (state) => {
  if (!state || !state.posts) {
    return initialState;
  }
  return state.posts;
};

export const selectAllPosts = createSelector(
  [selectPostsState],
  (postsState) => Array.isArray(postsState.posts) ? [...postsState.posts] : []
);

export const selectPostsStatus = createSelector(
  [selectPostsState],
  (postsState) => ({
    fetchPostsStatus: postsState.fetchPostsStatus || 'idle',
    createPostStatus: postsState.createPostStatus || 'idle',
    error: postsState.error || null
  })
);

export const selectPostById = createSelector(
  [selectAllPosts, (_, postId) => postId],
  (posts, postId) => posts.find(post => post.id === postId) || null
);

// Export Actions
export const {
  resetPostStatus,
  clearErrors
} = postsSlice.actions;

// Export Reducer
export default postsSlice.reducer;