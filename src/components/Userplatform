import React, { useState } from 'react';
import { 
  Box, Container, Grid, Typography, Button, Card, 
  CardContent, Avatar, IconButton, Drawer, List, 
  ListItem, ListItemIcon, ListItemText, AppBar, Toolbar 
} from '@mui/material';
import { 
  Home, Group, Article, Person, ExitToApp,
  Menu as MenuIcon, Add, Notifications
} from '@mui/icons-material';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2',
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const UserPlatform = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/home' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Groups', icon: <Group />, path: '/groups' },
    { text: 'Articles', icon: <Article />, path: '/articles' },
  ];

  const DrawerContent = () => (
    <Box sx={{ p: 2 }}>
      {/* User Info */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80, 
            margin: '0 auto',
            border: `2px solid ${colors.secondary}`
          }}
        />
        <Typography variant="h6" sx={{ mt: 2, color: colors.primary }}>
          John Doe
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Software Engineer
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            sx={{
              borderRadius: '8px',
              mb: 1,
              '&:hover': {
                bgcolor: colors.divider
              }
            }}
          >
            <ListItemIcon sx={{ color: colors.secondary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ color: colors.primary }}
            />
          </ListItem>
        ))}

        <ListItem 
          button 
          sx={{ 
            mt: 4,
            color: '#d32f2f',
            borderRadius: '8px',
            '&:hover': { bgcolor: '#ffebee' }
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: colors.background }}>
      {/* Side Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            bgcolor: colors.white
          },
        }}
      >
        <DrawerContent />
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: colors.white
          },
        }}
      >
        <DrawerContent />
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Top Bar */}
        <AppBar 
          position="static" 
          color="transparent" 
          elevation={0}
          sx={{ 
            borderBottom: `1px solid ${colors.divider}`,
            bgcolor: colors.white
          }}
        >
          <Toolbar>
            <IconButton
              sx={{ display: { md: 'none' }, mr: 2 }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <IconButton>
              <Notifications />
            </IconButton>
            <Button 
              variant="contained"
              startIcon={<Add />}
              sx={{ 
                ml: 2,
                bgcolor: colors.secondary,
                '&:hover': { bgcolor: colors.primary }
              }}
            >
              Create Post
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 3, color: colors.primary }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {[
                  { title: 'Join a Group', icon: <Group />, color: '#4CAF50' },
                  { title: 'Write an Article', icon: <Article />, color: '#2196F3' },
                  { title: 'Update Profile', icon: <Person />, color: '#9C27B0' },
                ].map((action) => (
                  <Grid item xs={12} sm={4} key={action.title}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { transform: 'translateY(-4px)' },
                        transition: 'transform 0.2s'
                      }}
                    >
                      <CardContent>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            color: action.color
                          }}
                        >
                          {action.icon}
                          <Typography sx={{ ml: 1 }}>
                            {action.title}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ mb: 3, color: colors.primary }}>
                Recent Activity
              </Typography>
              {/* Add your activity feed component here */}
            </Grid>

            {/* Recommendations */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 3, color: colors.primary }}>
                Recommended
              </Typography>
              {/* Add your recommendations component here */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default UserPlatform;