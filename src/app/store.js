// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/auth/authSlice';
import userReducer from '../Features/User/userSlice';
import eventReducer from '../Features/events/eventSlice';
import postsReducer from '../Features/posts/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    events: eventReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoring actions that involve non-serializable data like FormData
        ignoredActions: [
          'events/createEvent',
          'events/updateEventStatus',
          'posts/createPost/pending',
          'posts/createPost/fulfilled',
          'posts/createPost/rejected',
        ],
        // Ignoring specific paths in the actions or state
        ignoredActionPaths: ['payload.image', 'meta.arg'],
        ignoredPaths: ['events.events[].image', 'posts.meta.arg'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});


export default store;