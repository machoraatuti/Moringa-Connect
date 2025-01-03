import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";

// Reference to Moringa's color palette
const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF",
  divider: "rgba(240, 90, 40, 0.12)",
};

const Events = () => {
  const [events] = useState([
    {
      id: 1,
      image: require("../assets/images/graduation.jpg"),
      date: "10 Aug",
      title: "2025 Graduation Ceremony",
      description: "Celebrate the accomplishments of our talented students.",
      location: "Moringa School, Nairobi",
      time: "8:00 am - 1:00 pm",
      dressCode: "Smart Casual",
      category: "Educational",
    },
    {
      id: 2,
      image: require("../assets/images/cybersecurity.jpg"),
      date: "18 Jul",
      title: "Cybersecurity",
      description:
        "An in-depth webinar on cyber threat intelligence and security.",
      location: "Zoom Webinar",
      time: "5:30 pm - 8:00 pm",
      dressCode: "No dress code (Virtual)",
      category: "Technical",
    },
    {
      id: 3,
      image: require("../assets/images/cocktails.jpg"),
      date: "25 Sep",
      title: "Alumni Cocktail Night",
      description: "Network and celebrate with fellow alumni.",
      location: "Westlands, Nairobi",
      time: "6:00 pm - 9:00 pm",
      dressCode: "Formal/Smart Casual",
      category: "Social",
    },
    {
      id: 4,
      image: require("../assets/images/bootcamp.jpg"),
      date: "15 Nov",
      title: "Data Science Bootcamp",
      description:
        "Learn Python, Machine Learning, and AI tools in this hands-on bootcamp.",
      location: "Kikao64, Eldoret",
      time: "9:00 am - 5:00 pm",
      dressCode: "Business Casual",
      category: "Educational",
    },
    {
      id: 5,
      image: require("../assets/images/hiking.jpg"),
      date: "05 Dec",
      title: "Alumni Hike to Ngong Hills",
      description: "Reconnect with nature and fellow alumni.",
      location: "Ngong Hills, Nairobi",
      time: "7:00 am - 3:00 pm",
      dressCode: "Comfortable Hiking Attire",
      category: "Social",
    },
    {
      id: 6,
      image: require("../assets/images/frontend.jpg"),
      date: "22 Jan",
      title: "Frontend Developer Workshop",
      description: "Master React and Next.js in this practical session.",
      location: "Kikao64, Eldoret",
      time: "9:00 am - 4:00 pm",
      dressCode: "Smart Casual",
      category: "Technical",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewMore = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ bgcolor: moringaColors.background, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%", // Match the width of the AppBar
          height: "200px", // Adjust height to create proportional design
          overflow: "hidden",
          marginTop: 0, // Ensure no gap between the navbar and hero section
        }}
      >
        {/* Blurred Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${require("../assets/images/hero-background.jpg")})`, // Replace with your background image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)", // Apply blur effect
            zIndex: 1,
          }}
        />
        {/* Title */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: moringaColors.white,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Events
          </Typography>
        </Box>
      </Box>

      {/* Event Cards */}
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  position: "relative",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={event.image}
                  alt={event.title}
                  sx={{
                    objectFit: "cover",
                    maxHeight: "160px",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: moringaColors.secondary,
                    color: moringaColors.white,
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {event.date}
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: moringaColors.primary,
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {event.description}
                  </Typography>
                  <Button
                    onClick={() => handleViewMore(event)}
                    variant="contained"
                    sx={{
                      bgcolor: moringaColors.secondary,
                      "&:hover": { bgcolor: moringaColors.primary },
                    }}
                  >
                    View More →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent sx={{ p: 4 }}>
            <Box
              component="img"
              src={selectedEvent.image}
              alt={selectedEvent.title}
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                mb: 3,
              }}
            />
            <Typography
              variant="h4"
              sx={{ mb: 2, color: moringaColors.primary }}
            >
              {selectedEvent.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {selectedEvent.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Location:</strong> {selectedEvent.location}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Date:</strong> {selectedEvent.date}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Time:</strong> {selectedEvent.time}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Dress Code:</strong> {selectedEvent.dressCode}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseModal}
              sx={{
                color: moringaColors.secondary,
                "&:hover": { bgcolor: moringaColors.divider },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Events;
