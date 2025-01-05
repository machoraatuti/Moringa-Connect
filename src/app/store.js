// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/auth/authSlice';
import userReducer from '../Features/User/userSlice';
import eventReducer from '../Features/events/eventSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    events: eventReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['events/createEvent', 'events/updateEventStatus'],
        ignoredActionPaths: ['payload.image'],
        ignoredPaths: ['events.events[].image']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;