import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Paper } from '@mui/material';
import { Dashboard, Person, Group, Article, ExitToApp, AccountCircle, Event } from '@mui/icons-material';
import { logoutUser } from '../Features/auth/authSlice';
import Admin from '../components/Dashboard';
import Profile from '../pages/profile';
import Posts from '../pages/Posts';
import Groups from '../pages/Groups';
import Users from '../components/Users';

import AdminEvents from '../components/AdminEvents';

const drawerWidth = 240;

const colors = {
  primary: '#1A237E',
  secondary: '#FF5722',
  background: '#F8F9FA',
  white: '#FFFFFF',
  divider: 'rgba(255, 87, 34, 0.12)',
  hover: 'rgba(255, 87, 34, 0.15)'
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const sidebarItems = [
    { name: 'dashboard', icon: <Dashboard />, label: 'Dashboard' },
    { name: 'profile', icon: <AccountCircle />, label: 'Profile' },
    { name: 'posts', icon: <Article />, label: 'Posts' },
    { name: 'groups', icon: <Group />, label: 'Groups' },
    { name: 'users', icon: <Person />, label: 'Users' },
    { name: 'events', icon: <Event />, label: 'Events' }
  ];

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleSignOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // You could add error handling UI here
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: colors.background, minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: colors.primary,
            color: colors.white,
            borderRight: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: '0 16px 16px 0'
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{ 
            p: 2, 
            bgcolor: colors.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0 16px 0 0'
          }}
        >
          <Typography variant="h6" sx={{ color: colors.white, fontWeight: 600 }}>
            Admin Panel
          </Typography>
        </Paper>
        <Divider sx={{ bgcolor: colors.divider }} />
        <List sx={{ px: 1 }}>
          {sidebarItems.map((item) => (
            <ListItem 
              component="button" 
              key={item.name}
              onClick={() => handleTabChange(item.name)}
              sx={{
                bgcolor: selectedTab === item.name ? colors.secondary : 'transparent',
                color: colors.white,
                borderRadius: '8px',
                mb: 1,
                '&:hover': { 
                  bgcolor: selectedTab === item.name ? colors.secondary : colors.hover,
                  transform: 'translateX(4px)'
                },
                transition: 'all 0.3s ease',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px'
              }}
            >
              <ListItemIcon sx={{ color: colors.white, minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: selectedTab === item.name ? 600 : 400
                }}
              />
            </ListItem>
          ))}
          <Divider sx={{ my: 2, bgcolor: colors.divider }} />
          <ListItem 
            component="button"
            onClick={handleSignOut}
            sx={{ 
              color: colors.white,
              borderRadius: '8px',
              '&:hover': { 
                bgcolor: colors.hover,
                transform: 'translateX(4px)'
              },
              transition: 'all 0.3s ease',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px'
            }}
          >
            <ListItemIcon sx={{ color: colors.white, minWidth: '40px' }}>
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
          p: 4,
          bgcolor: colors.background,
          minHeight: '100vh'
        }}
      >
        <Paper
          elevation={2}
          sx={{ 
            p: 4,
            borderRadius: '16px',
            bgcolor: colors.white,
            minHeight: 'calc(100vh - 64px)'
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              color: colors.primary,
              mb: 4,
              fontWeight: 600 
            }}
          >
            {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
          </Typography>
          {selectedTab === 'dashboard' && <Admin />}
          {selectedTab === 'profile' && <Profile />}
          {selectedTab === 'posts' && <Posts />}
          {selectedTab === 'groups' && <Groups />}
          {selectedTab === 'users' && <Users />}
          {selectedTab === 'events' && <AdminEvents />}
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;