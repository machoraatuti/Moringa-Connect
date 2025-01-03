import React from "react";
import { Box, Typography, Grid, IconButton, Link } from "@mui/material";
import { Facebook, LinkedIn, Twitter, YouTube } from "@mui/icons-material";

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  white: "#FFFFFF",
};

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: moringaColors.primary,
        color: moringaColors.white,
        p: 4,
        mt: 4,
      }}
    >
      <Grid container spacing={4}>
        {/* Logo and Social Media */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            MORINGA
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Discover · Grow · Transform
          </Typography>
          <Box>
            <IconButton
              component={Link}
              href="https://www.facebook.com/moringaschool/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: moringaColors.white }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component={Link}
              href="https://www.linkedin.com/company/moringa-school"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: moringaColors.white }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component={Link}
              href="https://twitter.com/moringaschool"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: moringaColors.white }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              component={Link}
              href="https://www.youtube.com/MoringaSchoolVideos/videos"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: moringaColors.white }}
            >
              <YouTube />
            </IconButton>
          </Box>
        </Grid>

        {/* Address and Contact Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Ngong Lane, Ngong Lane Plaza, 1st Floor, Nairobi, Kenya
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> +254711 082 146 (General Enquiries)
          </Typography>
          <Typography variant="body2">
            <strong>WhatsApp:</strong> +254712 293 878
          </Typography>
          <Typography variant="body2">
            <strong>Corporate Inquiries:</strong> 0738 368 319
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Email:</strong> contact@moringaschool.com
          </Typography>
          <Typography variant="body2">
            <strong>Admissions:</strong> admissions@moringaschool.com
          </Typography>
          <Typography variant="body2">
            <strong>P.O. Box:</strong> 28860 – 00100, Nairobi
          </Typography>
        </Grid>

        {/* Google Map */}
        <Grid item xs={12} md={3}>
          <iframe
            src="https://maps.google.com/maps?q=Moringa%20School,%20Ngong%20Lane,%20Nairobi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Moringa School Location"
          ></iframe>
          <Typography
            variant="body2"
            sx={{ mt: 1, textAlign: "center", color: moringaColors.white }}
          >
            <Link
              href="https://maps.app.goo.gl/azKbTutxgoYuxWhS8"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: moringaColors.secondary, textDecoration: "none" }}
            >
              View on Google Maps
            </Link>
          </Typography>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          pt: 2,
          borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
        }}
      >
        <Typography variant="body2">
          © 2025 Moringa School. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
