import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Group, Person, Article } from '@mui/icons-material';

const Admin = () => {
 const stats = [
   { title: 'Total Groups', count: 150, icon: <Group />, color: '#1976d2' },
   { title: 'Total Users', count: 1200, icon: <Person />, color: '#2e7d32' },
   { title: 'Total Posts', count: 450, icon: <Article />, color: '#ed6c02' }
 ];

 const recentActivities = [
   {
     title: 'Recent Groups',
     items: [
       { name: 'React Developers', members: 45 },
       { name: 'UI/UX Design', members: 32 },
       { name: 'Mobile Dev', members: 28 }
     ]
   },
   {
     title: 'Recent Posts',
     items: [
       { title: 'Getting Started with React', author: 'John Doe' },
       { title: 'UI Design Tips', author: 'Jane Smith' },
       { title: 'Mobile Development', author: 'Mike Johnson' }
     ]
   },
   {
     title: 'Recent Comments',
     items: [
       { text: 'Great article!', author: 'Alice' },
       { text: 'Thanks for sharing', author: 'Bob' },
       { text: 'Very helpful', author: 'Carol' }
     ]
   }
 ];

 return (
   <Box p={3}>
     <Grid container spacing={3}>
       {/* Stats Cards */}
       {stats.map((stat) => (
         <Grid item xs={12} md={4} key={stat.title}>
           <Card sx={{ bgcolor: stat.color, color: 'white' }}>
             <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               {stat.icon}
               <Box>
                 <Typography variant="h6">{stat.title}</Typography>
                 <Typography variant="h4">{stat.count}</Typography>
               </Box>
             </CardContent>
           </Card>
         </Grid>
       ))}

       {/* Recent Activity Cards */}
       {recentActivities.map((activity) => (
         <Grid item xs={12} md={4} key={activity.title}>
           <Card sx={{ height: '100%' }}>
             <CardContent>
               <Typography variant="h6" gutterBottom>{activity.title}</Typography>
               {activity.items.map((item, index) => (
                 <Box key={index} sx={{ mb: 2 }}>
                   <Typography variant="subtitle1">
                     {item.name || item.title || item.text}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     {item.members ? `${item.members} members` : item.author}
                   </Typography>
                 </Box>
               ))}
               <Button variant="contained" fullWidth>See All</Button>
             </CardContent>
           </Card>
         </Grid>
       ))}
     </Grid>
   </Box>
 );
};

export default Admin;