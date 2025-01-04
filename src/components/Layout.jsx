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
} from "@mui/material";
import {
  Home,
  Menu,
  Group,
  Article,
  Person,
  Event,
  Close,
} from "@mui/icons-material";
import Footer from "./Footer";

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

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/app/home" },
    { text: "Profile", icon: <Person />, path: "/app/profile" },
    { text: "Groups", icon: <Group />, path: "/app/groups" },
    { text: "Posts", icon: <Article />, path: "/app/posts" },
    { text: "Events", icon: <Event />, path: "/app/events" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height
      }}
    >
      {/* AppBar for Hamburger Menu */}
      <AppBar position="fixed" sx={{ bgcolor: moringaColors.primary }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: moringaColors.white }}
          >
            Moringa Connect
          </Typography>
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
          p: 3,
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
