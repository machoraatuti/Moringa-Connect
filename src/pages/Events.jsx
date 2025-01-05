// components/UserEvents.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  selectAllEvents,
  selectEventNotifications,
  selectEventsLoading,
  selectEventsError,
  dismissNotification
} from '../Features/events/eventSlice';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
  Divider
} from "@mui/material";
import { 
  Close, 
  CalendarToday, 
  LocationOn, 
  AccessTime,
  Groups 
} from '@mui/icons-material';

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF",
  divider: "rgba(240, 90, 40, 0.12)",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336"
};

const getStatusColor = (status) => {
  const statusColors = {
    upcoming: moringaColors.primary,
    completed: moringaColors.success,
    cancelled: moringaColors.error,
    rescheduled: moringaColors.warning
  };
  return statusColors[status] || moringaColors.primary;
};

const UserEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const notifications = useSelector(selectEventNotifications);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleDismissNotification = (notificationId) => {
    dispatch(dismissNotification(notificationId));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: moringaColors.secondary }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: moringaColors.background, minHeight: "100vh" }}>
      {/* Notifications Banner */}
      {notifications.length > 0 && notificationVisible && (
        <Slide direction="down" in={true}>
          <Box sx={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 10,
            bgcolor: moringaColors.primary,
            color: moringaColors.white,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="body1">
              {notifications[0].message}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setNotificationVisible(false)}
              sx={{ color: moringaColors.white }}
            >
              <Close />
            </IconButton>
          </Box>
        </Slide>
      )}

      {/* Main Content */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, color: moringaColors.primary, fontWeight: 600 }}>
          Upcoming Events
        </Typography>

        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      sx={{
                        bgcolor: `${getStatusColor(event.status)}15`,
                        color: getStatusColor(event.status),
                        fontWeight: 500
                      }}
                    />
                  </Box>
                  
                  <Typography variant="h6" gutterBottom sx={{ color: moringaColors.primary }}>
                    {event.title}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2 }}
                  >
                    {event.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday sx={{ fontSize: 18, color: moringaColors.secondary }} />
                      <Typography variant="body2">{event.date}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime sx={{ fontSize: 18, color: moringaColors.secondary }} />
                      <Typography variant="body2">{event.time}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ fontSize: 18, color: moringaColors.secondary }} />
                      <Typography variant="body2">{event.location}</Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleViewDetails(event)}
                    sx={{
                      mt: 3,
                      bgcolor: moringaColors.secondary,
                      '&:hover': { bgcolor: moringaColors.primary }
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Event Details Modal */}
      <Dialog
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedEvent && (
          <>
            <DialogContent sx={{ p: 0 }}>
              <CardMedia
                component="img"
                height="240"
                image={selectedEvent.image}
                alt={selectedEvent.title}
              />
              <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={selectedEvent.status}
                    sx={{
                      bgcolor: `${getStatusColor(selectedEvent.status)}15`,
                      color: getStatusColor(selectedEvent.status),
                      fontWeight: 500
                    }}
                  />
                </Box>

                <Typography variant="h5" gutterBottom sx={{ color: moringaColors.primary }}>
                  {selectedEvent.title}
                </Typography>

                <Typography variant="body1" paragraph>
                  {selectedEvent.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                    <Typography variant="body1">{selectedEvent.date}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">Time</Typography>
                    <Typography variant="body1">{selectedEvent.time}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                    <Typography variant="body1">{selectedEvent.location}</Typography>
                  </Grid>
                  {selectedEvent.dressCode && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">Dress Code</Typography>
                      <Typography variant="body1">{selectedEvent.dressCode}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Capacity</Typography>
                    <Typography variant="body1">
                      {selectedEvent.attendance} / {selectedEvent.maxCapacity} attendees
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button 
                onClick={() => setSelectedEvent(null)}
                sx={{ color: moringaColors.primary }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default UserEvents;