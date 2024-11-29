import React, { useState } from 'react';
import { Box, Card, CardContent, Avatar, Typography, TextField, Button, Stack, Divider } from '@mui/material';

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
   <Box p={3}>
     <Card sx={{ maxWidth: 600, mx: 'auto' }}>
       <CardContent>
         <Stack spacing={3} alignItems="center">
           <Avatar
             src={adminData.image}
             sx={{ width: 150, height: 150 }}
           />
           
           <TextField
             fullWidth
             label="Name"
             value={adminData.name}
             onChange={(e) => setAdminData({...adminData, name: e.target.value})}
           />
           
           <TextField
             fullWidth
             label="Email"
             type="email"
             value={adminData.email}
             onChange={(e) => setAdminData({...adminData, email: e.target.value})}
           />
           
           <TextField
             fullWidth
             label="New Password"
             type="password"
             value={adminData.password}
             onChange={(e) => setAdminData({...adminData, password: e.target.value})}
           />

           <Button 
             variant="contained" 
             color="primary"
             fullWidth
             onClick={handleUpdate}
           >
             Update Profile
           </Button>

           <Button 
             variant="contained" 
             color="success"
             fullWidth
           >
             Create Post
           </Button>

           <Divider sx={{ width: '100%' }} />

           <Button 
             variant="contained"
             color="error"
             fullWidth
           >
             Delete Account
           </Button>

           <Button 
             variant="outlined"
             color="primary"
             fullWidth
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