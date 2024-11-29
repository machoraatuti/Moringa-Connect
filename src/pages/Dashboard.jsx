import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Dashboard, Person, Group, Article, ExitToApp, AccountCircle } from '@mui/icons-material';
import Admin from '../components/Dashboard';

const drawerWidth = 240;

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

 const handleSignOut = () => {   console.log('Signing out...');
 };

 return (
   <Box sx={{ display: 'flex' }}>
     <Drawer
       variant="permanent"
       sx={{
         width: drawerWidth,
         flexShrink: 0,
         '& .MuiDrawer-paper': {
           width: drawerWidth,
           boxSizing: 'border-box',
           bgcolor: '#1a237e',
           color: 'white'
         },
       }}
     >
       <Box sx={{ p: 2 }}>
         <Typography variant="h6">Admin Panel</Typography>
       </Box>
       <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
       <List>
         {sidebarItems.map((item) => (
           <ListItem 
             button 
             key={item.name}
             onClick={() => handleTabChange(item.name)}
             sx={{
               bgcolor: selectedTab === item.name ? 'rgba(255,255,255,0.08)' : 'transparent',
               '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' }
             }}
           >
             <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
             <ListItemText primary={item.label} />
           </ListItem>
         ))}
         <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.12)' }} />
         <ListItem 
           button 
           onClick={handleSignOut}
           sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' } }}
         >
           <ListItemIcon sx={{ color: 'white' }}><ExitToApp /></ListItemIcon>
           <ListItemText primary="Sign Out" />
         </ListItem>
       </List>
     </Drawer>
     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <Box sx={{ height: '100vh', p: 3 }}>

        <Typography variant="h5">
           {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Content
         </Typography>
        {selectedTab === 'dashboard' && <Admin/>}
        
         <Typography variant="h5">
           {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Content
         </Typography>
       </Box>
     </Box>
   </Box>
 );
};

export default AdminDashboard;