import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
  Menu,
} from "@mui/material";
import {
  Add,
  MoreVert,
  EventBusy,
  Schedule,
  Check,
  Delete,
} from "@mui/icons-material";
import {
  createEvent,
  updateEventStatus,
  deleteEvent,
  fetchEvents,
} from "../Features/events/eventSlice";

// Define theme colors for consistency
const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
};

// Available event types for the dropdown
const eventTypes = ["Conference", "Workshop", "Seminar", "Webinar", "Other"];

const AdminEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get authentication and events state from Redux
  const { isAdmin } = useSelector((state) => state.auth);
  const { events, loading, error } = useSelector((state) => state.events);

  // Local state management
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  
  // Form state with enhanced fields
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "",
    description: "",
    location: "",
    capacity: "",
    registrationDeadline: "",
    contactPerson: "",
    contactEmail: "",
    image: null,
    imagePreview: "",
  });

  // Notification state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState("");

  // Check admin status and fetch events on component mount
  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    } else {
      dispatch(fetchEvents());
    }
  }, [isAdmin, navigate, dispatch]);

  // Form validation helper
  const validateForm = () => {
    const requiredFields = [
      'title',
      'date',
      'startTime',
      'endTime',
      'type',
      'description',
      'location',
      'capacity',
      'registrationDeadline',
      'contactPerson',
      'contactEmail'
    ];
    
    const missingFields = requiredFields.filter(field => !newEvent[field]);
    return missingFields;
  };

  // Event handlers
  const handleCreateEvent = async () => {
    const missingFields = validateForm();
    
    if (missingFields.length > 0) {
      setStatusUpdateMessage(`Please fill in all required fields: ${missingFields.join(', ')}`);
      setSnackbarOpen(true);
      return;
    }

    try {
      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(newEvent).forEach(key => {
        if (key === 'image' && newEvent[key]) {
          formData.append('image', newEvent[key]);
        } else if (key !== 'imagePreview') {
          formData.append(key, newEvent[key]);
        }
      });

      await dispatch(createEvent(formData)).unwrap();
      setCreateModalOpen(false);
      // Reset form
      setNewEvent({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        type: "",
        description: "",
        location: "",
        capacity: "",
        registrationDeadline: "",
        contactPerson: "",
        contactEmail: "",
        image: null,
        imagePreview: "",
      });
      setStatusUpdateMessage("Event created successfully.");
      setSnackbarOpen(true);
      dispatch(fetchEvents());
    } catch (error) {
      console.error("Error creating event:", error);
      setStatusUpdateMessage("Failed to create event.");
      setSnackbarOpen(true);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedEvent) {
      console.error("No event selected.");
      return;
    }

    try {
      await dispatch(
        updateEventStatus({ eventId: selectedEvent.id, status: newStatus })
      ).unwrap();
      setStatusUpdateMessage(`Event "${selectedEvent.title}" is now ${newStatus}.`);
      setSnackbarOpen(true);
      setAnchorEl(null);
      dispatch(fetchEvents());
    } catch (error) {
      console.error("Error updating status:", error);
      setStatusUpdateMessage("Failed to update event status.");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent || !window.confirm("Are you sure you want to delete this event?"))
      return;

    try {
      await dispatch(deleteEvent(selectedEvent.id)).unwrap();
      setStatusUpdateMessage("Event deleted successfully.");
      setSnackbarOpen(true);
      setAnchorEl(null);
      dispatch(fetchEvents());
    } catch (error) {
      console.error("Error deleting event:", error);
      setStatusUpdateMessage("Failed to delete event.");
      setSnackbarOpen(true);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent({
          ...newEvent,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box sx={{ p: 3, bgcolor: moringaColors.background, minHeight: "100vh" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" sx={{ color: moringaColors.primary }}>
          Event Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateModalOpen(true)}
          sx={{ bgcolor: moringaColors.secondary }}
        >
          Create Event
        </Button>
      </Box>

      {/* Main Content - Event Cards Grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card sx={{ 
                borderRadius: 3, 
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image || '/placeholder-event.jpg'}
                  alt={event.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2
                  }}>
                    <Typography variant="h6" noWrap sx={{ maxWidth: '80%' }}>
                      {event.title}
                    </Typography>
                    <IconButton
                      onClick={(e) => {
                        setSelectedEvent(event);
                        setAnchorEl(e.currentTarget);
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                  
                  <Chip
                    label={event.status}
                    sx={{ mb: 2 }}
                    color={
                      event.status === "upcoming"
                        ? "primary"
                        : event.status === "completed"
                        ? "success"
                        : event.status === "cancelled"
                        ? "error"
                        : "warning"
                    }
                  />
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {event.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Location:</strong> {event.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Time:</strong> {event.startTime} - {event.endTime}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Event Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: 2 }
        }}
      >
        <MenuItem onClick={() => handleStatusChange("completed")}>
          <Check sx={{ mr: 1 }} /> Mark as Completed
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("cancelled")}>
          <EventBusy sx={{ mr: 1 }} /> Cancel Event
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("rescheduled")}>
          <Schedule sx={{ mr: 1 }} /> Reschedule Event
        </MenuItem>
        <MenuItem onClick={handleDeleteEvent} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Delete Event
        </MenuItem>
      </Menu>

      {/* Create Event Modal */}
      <Dialog 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Title Field */}
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                label="Title"
                fullWidth
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                error={!newEvent.title}
                helperText={!newEvent.title ? "Title is required" : ""}
              />
            </Grid>
            
            {/* Date Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Registration Deadline"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newEvent.registrationDeadline}
                onChange={(e) => setNewEvent({ ...newEvent, registrationDeadline: e.target.value })}
              />
            </Grid>
            
            {/* Time Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Start Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="End Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
              />
            </Grid>
            
            {/* Event Type Field */}
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  label="Event Type"
                >
                  {eventTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Location Field */}
            <Grid item xs={12}>
              <TextField
                required
                label="Location"
                fullWidth
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
            </Grid>
            
            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                required
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
            </Grid>
            
            {/* Capacity and Contact Person Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Capacity"
                type="number"
                fullWidth
                value={newEvent.capacity}
                onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Contact Person"
                fullWidth
                value={newEvent.contactPerson}
                onChange={(e) => setNewEvent({ ...newEvent, contactPerson: e.target.value })}
              />
            </Grid>
            
            {/* Contact Email Field */}
            <Grid item xs={12}>
              <TextField
                required
                label="Contact Email"
                type="email"
                fullWidth
                value={newEvent.contactEmail}
                onChange={(e) => setNewEvent({ ...newEvent, contactEmail: e.target.value })}
              />
            </Grid>
            
            {/* Image Upload Field */}
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="event-image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="event-image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  startIcon={<Add />}
                  sx={{ mb: 2 }}
                >
                  Upload Event Image
                </Button>
              </label>
              {newEvent.imagePreview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img
                    src={newEvent.imagePreview}
                    alt="Event preview"
                    style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '8px' }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateEvent}
            variant="contained"
            sx={{ bgcolor: moringaColors.secondary }}
          >
            Create Event
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={statusUpdateMessage.includes("Failed") ? "error" : "success"}
          sx={{ width: '100%' }}
        >
          {statusUpdateMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
  };

export default AdminEvents;