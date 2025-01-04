import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Home,
  Group,
  Article,
  Person,
  Event,
  Menu,
  Close,
} from "@mui/icons-material";
import Footer from "./Footer";

// Importing the logo
import moringaLogo from "../assets/images/moringalogo.png";

const moringaColors = {
  primary: "#0A1F44",
  secondary: "#F05A28",
  background: "#FFF5F2",
  white: "#FFFFFF",
  divider: "rgba(240, 90, 40, 0.12)",
};

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 900px)");

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/app/home" },
    { text: "Groups", icon: <Group />, path: "/app/groups" },
    { text: "Posts", icon: <Article />, path: "/app/posts" },
    { text: "Events", icon: <Event />, path: "/app/events" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden", // Prevent horizontal scrollbars
      }}
    >
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: moringaColors.white,
          color: moringaColors.primary,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: isLargeScreen ? "space-between" : "flex-start",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={moringaLogo}
              alt="Moringa Logo"
              style={{ height: "40px", marginRight: "8px" }}
            />
            <Typography
              variant="h6"
              sx={{
                color: moringaColors.primary,
                fontWeight: 700,
              }}
            >
              Moringa Alumni Connect
            </Typography>
          </Box>

          {/* Menu for Larger Screens */}
          {isLargeScreen && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {menuItems.map((item) => (
                <Typography
                  key={item.text}
                  sx={{
                    cursor: "pointer",
                    color: moringaColors.primary,
                    fontWeight: "bold",
                    fontSize: "14px",
                    "&:hover": { color: moringaColors.secondary },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          )}

          {/* Hamburger Menu for Smaller Screens */}
          {!isLargeScreen && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsDrawerOpen(true)}
              sx={{
                marginLeft: "auto",
              }}
            >
              <Menu sx={{ color: moringaColors.primary }} />
            </IconButton>
          )}

          {/* Profile Icon (Always Visible) */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => navigate("/app/profile")}
            sx={{
              color: moringaColors.primary,
            }}
          >
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Navigation */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            bgcolor: moringaColors.primary,
            color: moringaColors.white,
            "& .MuiListItemIcon-root": {
              color: moringaColors.white,
            },
            "& .MuiListItem-root:hover": {
              bgcolor: moringaColors.divider,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setIsDrawerOpen(false)} color="inherit">
            <Close />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setIsDrawerOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, // Remove padding for full-width hero
          bgcolor: moringaColors.background,
          mt: "64px",
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
