import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Group, Article, Person } from '@mui/icons-material';

const moringaColors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  background: '#FFF5F2', 
  white: '#FFFFFF',
  divider: 'rgba(240, 90, 40, 0.12)'
};

const Layout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Groups', icon: <Group />, path: '/app/groups' },
    { text: 'Posts', icon: <Article />, path: '/app/posts' },
    { text: 'Profile', icon: <Person />, path: '/app/profile' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: moringaColors.primary,
            color: moringaColors.white,
            '& .MuiListItemIcon-root': {
              color: moringaColors.white
            },
            '& .MuiListItem-root:hover': {
              bgcolor: moringaColors.divider
            }
          }
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          bgcolor: moringaColors.background 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
