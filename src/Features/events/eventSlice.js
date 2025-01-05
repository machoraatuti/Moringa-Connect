import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from './eventService';

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await eventService.fetchEvents();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData, { rejectWithValue }) => {
    try {
      return await eventService.createEvent(eventData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEventStatus = createAsyncThunk(
  'events/updateStatus',
  async ({ eventId, status, message }, { rejectWithValue }) => {
    try {
      const updatedEvent = await eventService.updateEventStatus(eventId, status, message);
      return {
        eventId,
        status,
        notification: {
          id: Date.now(),
          message,
          type: status,
          timestamp: new Date().toISOString()
        },
        updatedEvent
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendNotification = createAsyncThunk(
  'events/sendNotification',
  async ({ eventId, message }, { rejectWithValue }) => {
    try {
      return await eventService.sendNotification(eventId, message);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (eventId, { rejectWithValue }) => {
    try {
      await eventService.deleteEvent(eventId);
      return eventId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  events: [],
  notifications: [],
  loading: false,
  error: null,
  lastUpdated: null
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
    dismissNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateEventStatus.fulfilled, (state, action) => {
        const { eventId, status, notification, updatedEvent } = action.payload;
        const index = state.events.findIndex(e => e.id === eventId);
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
        if (notification) {
          state.notifications.unshift(notification);
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(sendNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event.id !== action.payload);
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
        state.notifications.unshift({
          id: Date.now(),
          message: 'Event successfully deleted',
          type: 'success',
          timestamp: new Date().toISOString()
        });
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearNotifications, dismissNotification } = eventSlice.actions;
export const selectAllEvents = (state) => state.events.events;
export const selectEventById = (state, eventId) => 
  state.events.events.find(event => event.id === eventId);
export const selectEventNotifications = (state) => state.events.notifications;
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventsError = (state) => state.events.error;

export default eventSlice.reducer;