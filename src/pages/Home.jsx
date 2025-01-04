import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Modal,
  Backdrop,
  Fade,
  TextField,
} from "@mui/material";
import {
  Group,
  Article,
  Event,
  ArrowForward,
  Storefront,
  LocalLibrary,
  MedicalServices,
  PlayCircle,
  People,
  BusinessCenter,
  CalendarToday,
  School,
  Work,
  Star,
} from "@mui/icons-material";
import Footer from "../components/Footer";

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF",
};

const Home = () => {
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleOpenVideo = (url) => {
    setVideoUrl(url);
    setOpenVideoModal(true);
  };

  const handleCloseVideo = () => {
    setVideoUrl("");
    setOpenVideoModal(false);
  };

  return (
    <Box sx={{ bgcolor: moringaColors.background, minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "80vh",
          backgroundImage: `url(${require("../assets/images/landing-hero.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: moringaColors.white,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          Welcome to Moringa Connect
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          A platform for Moringa alumni to connect, grow, and thrive.
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mr: 2,
              bgcolor: moringaColors.secondary,
              "&:hover": { bgcolor: moringaColors.primary },
            }}
            href="/app/events"
          >
            Explore Events
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: moringaColors.white,
              borderColor: moringaColors.white,
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
            }}
            href="/app/groups"
          >
            Join Groups
          </Button>
        </Box>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          bgcolor: moringaColors.primary,
          color: moringaColors.white,
          p: 4,
          textAlign: "center",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CalendarToday
              sx={{ fontSize: "48px", color: moringaColors.secondary, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ color: moringaColors.secondary, fontWeight: 700 }}
            >
              2014
            </Typography>
            <Typography>Year Moringa was Founded</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <School
              sx={{ fontSize: "48px", color: moringaColors.secondary, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ color: moringaColors.secondary, fontWeight: 700 }}
            >
              8,000+
            </Typography>
            <Typography>Trained Professionals</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Work
              sx={{ fontSize: "48px", color: moringaColors.secondary, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ color: moringaColors.secondary, fontWeight: 700 }}
            >
              1,000+
            </Typography>
            <Typography>Employer Partners</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Star
              sx={{ fontSize: "48px", color: moringaColors.secondary, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ color: moringaColors.secondary, fontWeight: 700 }}
            >
              95%
            </Typography>
            <Typography>Graduate Satisfaction</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Alumni Services Section */}
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: moringaColors.primary,
            mb: 4,
            fontWeight: 700,
          }}
        >
          Alumni Services
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: (
                <Storefront
                  sx={{
                    fontSize: "64px",
                    color: moringaColors.secondary,
                  }}
                />
              ),
              title: "Card Registration",
              description:
                "600 KSH, renewable annually. Access all alumni services with a card.",
            },
            {
              icon: (
                <LocalLibrary
                  sx={{
                    fontSize: "64px",
                    color: moringaColors.secondary,
                  }}
                />
              ),
              title: "Library Services",
              description:
                "Access library resources Monday to Saturday, from 9AM to 8PM.",
            },
            {
              icon: (
                <MedicalServices
                  sx={{
                    fontSize: "64px",
                    color: moringaColors.secondary,
                  }}
                />
              ),
              title: "Medical Services",
              description:
                "10% discount on consultations at the medical center.",
            },
            {
              icon: (
                <Group
                  sx={{
                    fontSize: "64px",
                    color: moringaColors.secondary,
                  }}
                />
              ),
              title: "Student Programs",
              description:
                "Graduation, Alumni Dinners, and mentorship programs.",
            },
          ].map((service, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                {service.icon}
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2">{service.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Registration Section */}
      <Box
        sx={{
          bgcolor: moringaColors.primary,
          color: moringaColors.white,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: moringaColors.secondary }}>
          Join Our Alumni Community
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Register today to access all the alumni services, events, and
          networking opportunities!
        </Typography>
        <Button
          variant="contained"
          href="/app/register"
          sx={{
            bgcolor: moringaColors.secondary,
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.8)" },
          }}
        >
          Register Here
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: moringaColors.primary,
            mb: 4,
            fontWeight: 700,
          }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: (
                <Event
                  sx={{
                    fontSize: "64px",
                    color: moringaColors.secondary,
                  }}
                />
              ),
              title: "Events",
              description: "Explore engaging alumni events and activities.",
              link: "/app/events",
            },
            {
              icon: (
                <Group
                  sx={{
                    fontSize: "64px",
                    color: moringaColors.secondary,
                  }}
                />
              ),
              title: "Groups",
              description:
                "Join groups to connect and collaborate with others.",
              link: "/app/groups",
            },
            {
              icon: (
                <Article
                  sx={{
                    fontSize: "64px",
                    color: moringaColors.secondary,
                  }}
                />
              ),
              title: "Posts",
              description:
                "Share stories and updates with the alumni community.",
              link: "/app/posts",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2">{feature.description}</Typography>
                <Button
                  href={feature.link}
                  sx={{ color: moringaColors.secondary, mt: 2 }}
                  endIcon={<ArrowForward />}
                >
                  Learn More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: moringaColors.primary,
            mb: 4,
            fontWeight: 700,
          }}
        >
          Alumni Testimonials
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              videoUrl: "https://www.youtube.com/embed/A3i758wwLFE",
              title: "Janeth Okwaro - Data Science Graduate",
            },
            {
              videoUrl: "https://www.youtube.com/embed/YE2Ai1KdZoE",
              title: "Faith Moraa - Software Engineering Graduate",
            },
          ].map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  height: "300px",
                }}
                onClick={() => handleOpenVideo(testimonial.videoUrl)}
              >
                <Box
                  component="img"
                  src={`https://img.youtube.com/vi/${testimonial.videoUrl
                    .split("/")
                    .pop()}/0.jpg`}
                  alt={testimonial.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                >
                  <PlayCircle
                    sx={{ fontSize: "48px", color: moringaColors.white }}
                  />
                </Box>
              </Card>
              <Typography
                variant="body1"
                sx={{
                  color: moringaColors.primary,
                  mt: 2,
                  textAlign: "center",
                }}
              >
                {testimonial.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Newsletter Section */}
      <Box
        sx={{
          bgcolor: moringaColors.background,
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, color: moringaColors.primary, fontWeight: 700 }}
        >
          Stay up to date with upcoming events, free learning materials, news,
          and updates!
        </Typography>
        <Card
          sx={{
            p: 3,
            width: "100%",
            maxWidth: "500px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mb: 2, fontWeight: 700 }}
          >
            Subscribe to Moringa Newsletter
          </Typography>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            color="secondary"
            sx={{
              bgcolor: moringaColors.secondary,
              "&:hover": { bgcolor: moringaColors.primary },
            }}
          >
            Subscribe
          </Button>
        </Card>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Video Modal */}
      <Modal
        open={openVideoModal}
        onClose={handleCloseVideo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openVideoModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              height: "60%",
              bgcolor: moringaColors.background,
              borderRadius: "8px",
              boxShadow: 24,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Home;
