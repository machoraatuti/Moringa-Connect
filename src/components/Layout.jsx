import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Features/auth/authSlice';
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
  Divider,
} from "@mui/material";
import {
  Home,
  Group,
  Article,
  Person,
  Event,
  Menu,
  Close,
  ExitToApp,
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
  const dispatch = useDispatch();
  const isLargeScreen = useMediaQuery("(min-width: 900px)");
  const { isAdmin, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/app/home" },
    { text: "Groups", icon: <Group />, path: "/app/groups" },
    { text: "Posts", icon: <Article />, path: "/app/posts" },
    { text: "Events", icon: <Event />, path: "/app/events" },
  ];

  const handleProfileClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/app/profile");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
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

          {isLargeScreen && (
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
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
              {/* Sign Out Button for large screens */}
              <IconButton
                onClick={handleSignOut}
                sx={{
                  color: moringaColors.primary,
                  "&:hover": { color: moringaColors.secondary },
                }}
              >
                <ExitToApp />
              </IconButton>
            </Box>
          )}

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

          <IconButton
            edge="end"
            color="inherit"
            onClick={handleProfileClick}
            sx={{
              color: moringaColors.primary,
            }}
          >
            <Person />
          </IconButton>
        </Toolbar>
      </AppBar>

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
          <Divider sx={{ my: 2, bgcolor: moringaColors.divider }} />
          {/* Sign Out Button in drawer */}
          <ListItem
            button
            onClick={handleSignOut}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          bgcolor: moringaColors.background,
          mt: "64px",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;