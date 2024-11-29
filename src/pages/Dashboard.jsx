import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Dashboard, Person, Group, Article, ExitToApp, AccountCircle } from '@mui/icons-material';
import Admin from '../components/Dashboard';
import Profile from '../components/profile';
import Posts from '../components/Post';
import Groups from '../components/Groups';
import Users from '../components/Users';

const drawerWidth = 240;

// Moringa color scheme
const colors = {
  primary: '#0A1F44', // Navy blue
  secondary: '#F05A28', // Orange
  background: '#FFF5F2', // Light peach
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)' // Semi-transparent orange
};

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const sidebarItems = [
    { name: 'dashboard', icon: <Dashboard />, label: 'Dashboard' },
    { name: 'profile', icon: <AccountCircle />, label: 'Profile' },
    { name: 'posts', icon: <Article />, label: 'Posts' },
    { name: 'groups', icon: <Group />, label: 'Groups' },
    { name: 'users', icon: <Person />, label: 'Users' }
  ];

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleSignOut = () => {
    console.log('Signing out...');
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
            borderRight: `1px solid ${colors.divider}`
          },
        }}
      >
        <Box sx={{ 
          p: 2, 
          bgcolor: colors.secondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant="h6" sx={{ color: colors.white }}>
            Admin Panel
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: colors.divider }} />
        <List>
          {sidebarItems.map((item) => (
            <ListItem 
              component="button" 
              key={item.name}
              onClick={() => handleTabChange(item.name)}
              sx={{
                bgcolor: selectedTab === item.name ? colors.secondary : 'transparent',
                color: colors.white,
                '&:hover': { 
                  bgcolor: selectedTab === item.name ? colors.secondary : 'rgba(240, 90, 40, 0.08)'
                },
                transition: 'background-color 0.3s',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px'
              }}
            >
              <ListItemIcon sx={{ color: colors.white }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <Divider sx={{ my: 2, bgcolor: colors.divider }} />
          <ListItem 
            component="button"
            onClick={handleSignOut}
            sx={{ 
              color: colors.white,
              '&:hover': { bgcolor: 'rgba(240, 90, 40, 0.08)' },
              border: 'none',
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px'
            }}
          >
            <ListItemIcon sx={{ color: colors.white }}>
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
          p: 3,
          bgcolor: colors.background,
          minHeight: '100vh'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: colors.primary,
              mb: 3,
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
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;