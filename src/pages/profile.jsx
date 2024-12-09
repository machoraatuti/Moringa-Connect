import React, { useState } from 'react';
import { Box, Card, CardContent, Avatar, Typography, TextField, Button, Stack, Divider } from '@mui/material';

// Moringa color scheme
const colors = {
 primary: '#0A1F44', // Navy blue
 secondary: '#F05A28', // Orange
 background: '#FFF5F2', // Light peach
 white: '#FFFFFF',
 divider: 'rgba(240, 90, 40, 0.12)' // Semi-transparent orange
};

const Profile = () => {
 const [adminData, setAdminData] = useState({
   name: 'Admin User',
   email: 'admin@example.com',
   password: '',
   image: 'https://via.placeholder.com/150'
 });

 const handleUpdate = () => {
   console.log('Updating profile:', adminData);
 };

 return (
   <Box p={3} sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
     <Card sx={{ 
       maxWidth: 600, 
       mx: 'auto',
       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
       border: `1px solid ${colors.divider}`
     }}>
       <CardContent>
         <Typography 
           variant="h4" 
           sx={{ 
             color: colors.primary,
             textAlign: 'center',
             mb: 4,
             fontWeight: 600
           }}
         >
           Profile Settings
         </Typography>
         
         <Stack spacing={3} alignItems="center">
           <Avatar
             src={adminData.image}
             sx={{ 
               width: 150, 
               height: 150,
               border: `4px solid ${colors.secondary}`,
               boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
             }}
           />
           
           <TextField
             fullWidth
             label="Name"
             value={adminData.name}
             onChange={(e) => setAdminData({...adminData, name: e.target.value})}
             sx={{
               '& .MuiOutlinedInput-root': {
                 '&:hover fieldset': {
                   borderColor: colors.secondary,
                 },
                 '&.Mui-focused fieldset': {
                   borderColor: colors.secondary,
                 },
               },
               '& .MuiInputLabel-root.Mui-focused': {
                 color: colors.secondary,
               },
             }}
           />
           
           <TextField
             fullWidth
             label="Email"
             type="email"
             value={adminData.email}
             onChange={(e) => setAdminData({...adminData, email: e.target.value})}
             sx={{
               '& .MuiOutlinedInput-root': {
                 '&:hover fieldset': {
                   borderColor: colors.secondary,
                 },
                 '&.Mui-focused fieldset': {
                   borderColor: colors.secondary,
                 },
               },
               '& .MuiInputLabel-root.Mui-focused': {
                 color: colors.secondary,
               },
             }}
           />
           
           <TextField
             fullWidth
             label="New Password"
             type="password"
             value={adminData.password}
             onChange={(e) => setAdminData({...adminData, password: e.target.value})}
             sx={{
               '& .MuiOutlinedInput-root': {
                 '&:hover fieldset': {
                   borderColor: colors.secondary,
                 },
                 '&.Mui-focused fieldset': {
                   borderColor: colors.secondary,
                 },
               },
               '& .MuiInputLabel-root.Mui-focused': {
                 color: colors.secondary,
               },
             }}
           />

           <Button 
             variant="contained" 
             fullWidth
             onClick={handleUpdate}
             sx={{
               bgcolor: colors.secondary,
               '&:hover': {
                 bgcolor: colors.primary,
               },
               fontWeight: 600,
               py: 1.5
             }}
           >
             Update Profile
           </Button>

           <Button 
             variant="contained"
             fullWidth
             sx={{
               bgcolor: colors.primary,
               '&:hover': {
                 bgcolor: colors.secondary,
               },
               fontWeight: 600,
               py: 1.5
             }}
           >
             Create Post
           </Button>

           <Divider sx={{ 
             width: '100%',
             borderColor: colors.divider,
             my: 2
           }} />

           <Button 
             variant="outlined"
             fullWidth
             sx={{
               color: '#d32f2f',
               borderColor: '#d32f2f',
               '&:hover': {
                 bgcolor: '#ffebee',
                 borderColor: '#d32f2f',
               },
               fontWeight: 600,
               py: 1.5
             }}
           >
             Delete Account
           </Button>

           <Button 
             variant="outlined"
             fullWidth
             sx={{
               color: colors.primary,
               borderColor: colors.primary,
               '&:hover': {
                 bgcolor: colors.background,
                 borderColor: colors.secondary,
                 color: colors.secondary
               },
               fontWeight: 600,
               py: 1.5
             }}
           >
             Sign Out
           </Button>
         </Stack>
       </CardContent>
     </Card>
   </Box>
 );
};

export default Profile;