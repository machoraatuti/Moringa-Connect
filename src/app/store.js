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
    posts: postsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'posts/createPost/pending', 
          'posts/createPost/fulfilled', 
          'posts/createPost/rejected',
          'events/createEvent', 
          'events/updateEventStatus'
        ],
        ignoredActionPaths: [
          'payload.image', 
          'meta.arg.image'
        ],
        ignoredPaths: [
          'events.events[].image',
          'posts.posts[].image'
        ]
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;