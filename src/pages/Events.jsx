import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Search, EventAvailable, Add } from "@mui/icons-material";

// Reference to Moringa's color palette
const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF",
  divider: "rgba(240, 90, 40, 0.12)",
};

const cardStyles = {
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
};

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      date: "2025-01-15",
      title: "Web Development Workshop",
      description: "Learn React and Node.js from industry experts.",
      category: "Development",
      location: "Online",
      host: "Mishael",
    },
    {
      id: 2,
      date: "2025-02-10",
      title: "UI/UX Design Bootcamp",
      description: "Explore Figma and Adobe XD with practical sessions.",
      category: "Design",
      location: "Mombasa, Kenya",
      host: "Vinter",
    },
    {
      id: 3,
      date: "2025-03-05",
      title: "Alumni Hike",
      description:
        "Reconnect with fellow alumni during a fun outdoor adventure.",
      category: "Social",
      location: "Ngong Hills, Kenya",
      host: "John Doe",
    },
    {
      id: 4,
      date: "2025-04-20",
      title: "Career Growth Strategies",
      description: "Interactive session on advancing your tech career.",
      category: "Career",
      location: "Nairobi, Kenya",
      host: "Jane Doe",
    },
    {
      id: 5,
      date: "2025-05-12",
      title: "Alumni Cocktail Night",
      description: "An evening to network and celebrate the success of alumni.",
      category: "Social",
      location: "Nairobi, Kenya",
      host: "Moringa Admin",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    host: "",
  });

  const categories = ["all", "Development", "Design", "Career", "Social"];

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle creating a new event
  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.category && newEvent.host) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        host: "",
      });
      setOpenCreateEvent(false);
    }
  };

  const EventCard = ({ event }) => (
    <Card sx={cardStyles}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ color: moringaColors.primary, fontWeight: 600 }}
        >
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Hosted by: {event.host}
        </Typography>
        <Typography variant="body2" mb={1}>
          {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {event.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {event.date}
        </Typography>
        <Chip
          label={event.category}
          size="small"
          sx={{
            bgcolor: moringaColors.primary,
            color: moringaColors.white,
            borderRadius: "20px",
            fontSize: "0.75rem",
            mt: 1,
          }}
        />
      </CardContent>
    </Card>
  );

  return (
    <Box p={2} sx={{ bgcolor: moringaColors.background, minHeight: "100vh" }}>
      {/* Introduction */}
      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{ color: moringaColors.primary, fontWeight: 600 }}
          gutterBottom
        >
          Events and Opportunities
        </Typography>
        <Typography variant="body1" sx={{ color: moringaColors.primary }}>
          Welcome to the Moringa Alumni Events section! Here, you'll find
          opportunities to connect, learn, and grow as part of the alumni
          community. From technical workshops to social gatherings, we have
          something for everyone.
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          placeholder="Search events..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: moringaColors.white,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "&:hover fieldset": { borderColor: moringaColors.secondary },
              "&.Mui-focused fieldset": {
                borderColor: moringaColors.secondary,
              },
            },
          }}
        />
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{
            minWidth: 120,
            bgcolor: moringaColors.white,
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: moringaColors.divider,
            },
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Handle No Events Found */}
      {filteredEvents.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            color: moringaColors.primary,
            mt: 5,
            p: 2,
            borderRadius: "8px",
            bgcolor: moringaColors.white,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No events found.
          </Typography>
          <Typography variant="body2">
            Try adjusting your search term or filter category.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Event Dialog */}
      <Dialog
        open={openCreateEvent}
        onClose={() => setOpenCreateEvent(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" mb={2}>
            Create New Event
          </Typography>
          <TextField
            label="Title"
            fullWidth
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Location"
            fullWidth
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
            margin="normal"
          />
          <Select
            label="Category"
            fullWidth
            value={newEvent.category}
            onChange={(e) =>
              setNewEvent({ ...newEvent, category: e.target.value })
            }
            margin="normal"
            displayEmpty
            sx={{ mt: 2 }}
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categories
              .filter((c) => c !== "all")
              .map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
          </Select>
          <TextField
            label="Host"
            fullWidth
            value={newEvent.host}
            onChange={(e) => setNewEvent({ ...newEvent, host: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCreateEvent(false)}
            sx={{ color: moringaColors.secondary }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateEvent}
            variant="contained"
            sx={{
              bgcolor: moringaColors.secondary,
              "&:hover": { bgcolor: moringaColors.primary },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Events;
