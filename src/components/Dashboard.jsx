import React from 'react';
import { 
 Grid, Card, CardContent, Typography, Button, Box, Avatar,
 IconButton, LinearProgress, Divider
} from '@mui/material';
import { 
 Group, Person, Article, TrendingUp, School,
 Chat, Event, Work, BarChart, ReadMore
} from '@mui/icons-material';

// Moringa colors
const colors = {
 primary: '#0A1F44', // Navy blue
 secondary: '#F05A28', // Orange
 background: '#FFF5F2', // Light peach
 white: '#FFFFFF',
 divider: 'rgba(240, 90, 40, 0.12)'
};

const Admin = () => {
 const stats = [
   { 
     title: 'Total Alumni',
     count: 1200,
     increase: '+12%',
     icon: <School />,
     color: colors.primary
   },
   { 
     title: 'Active Groups', 
     count: 150, 
     increase: '+5%',
     icon: <Group />,
     color: colors.secondary
   },
   { 
     title: 'Monthly Posts', 
     count: 450, 
     increase: '+8%',
     icon: <Article />,
     color: '#2E7D32'
   },
   { 
     title: 'Employment Rate', 
     count: '85%', 
     increase: '+3%',
     icon: <Work />,
     color: '#1976D2'
   }
 ];

 const alumniProgress = [
   { course: 'Software Engineering', count: 450, target: 500, progress: 90 },
   { course: 'Data Science', count: 280, target: 300, progress: 93 },
   { course: 'UI/UX Design', count: 180, target: 200, progress: 90 }
 ];

 const recentActivities = [
   {
     title: 'Latest Alumni Updates',
     icon: <TrendingUp />,
     items: [
       { 
         name: 'Horace Njoroge', 
         action: 'Started new position at Microsoft',
         time: '2 hours ago',
         avatar: 'https://via.placeholder.com/40'
       },
       { 
         name: 'Jeremy Kibaara', 
         action: 'Completed AWS certification',
         time: '5 hours ago',
         avatar: 'https://via.placeholder.com/40'
       }
     ]
   },
   {
     title: 'Upcoming Events',
     icon: <Event />,
     items: [
       {
         name: 'Alumni Networking Night',
         date: 'March 15, 2024',
         participants: 45
       },
       {
         name: 'Tech Talk: AI in 2024',
         date: 'March 20, 2024',
         participants: 120
       }
     ]
   }
 ];

 const jobStats = [
   { company: 'Microsoft', hires: 25 },
   { company: 'Safaricom', hires: 20 },
   { company: 'Google', hires: 15 },
   { company: 'Local Startups', hires: 45 }
 ];

 return (
   <Box sx={{ bgcolor: colors.background, minHeight: '100vh', p: 3 }}>
     <Typography variant="h4" sx={{ color: colors.primary, mb: 4, fontWeight: 600 }}>
       Admin Dashboard
     </Typography>

     {/* Stats Cards */}
     <Grid container spacing={3} mb={4}>
       {stats.map((stat) => (
         <Grid item xs={12} sm={6} md={3} key={stat.title}>
           <Card sx={{ 
             bgcolor: colors.white,
             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
             border: `1px solid ${colors.divider}`
           }}>
             <CardContent>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                 <Avatar sx={{ bgcolor: stat.color }}>{stat.icon}</Avatar>
                 <Typography 
                   variant="caption" 
                   sx={{ 
                     color: 'green',
                     bgcolor: 'rgba(0,200,0,0.1)',
                     px: 1,
                     py: 0.5,
                     borderRadius: 1
                   }}
                 >
                   {stat.increase}
                 </Typography>
               </Box>
               <Typography variant="h4" sx={{ color: colors.primary, mb: 1 }}>
                 {stat.count}
               </Typography>
               <Typography variant="body2" color="text.secondary">
                 {stat.title}
               </Typography>
             </CardContent>
           </Card>
         </Grid>
       ))}
     </Grid>

     <Grid container spacing={3}>
       {/* Course Progress */}
       <Grid item xs={12} md={8}>
         <Card sx={{ mb: 3 }}>
           <CardContent>
             <Typography variant="h6" sx={{ color: colors.primary, mb: 3 }}>
               Course Enrollment Progress
             </Typography>
             {alumniProgress.map((course) => (
               <Box key={course.course} mb={2}>
                 <Box display="flex" justifyContent="space-between" mb={1}>
                   <Typography variant="body2">{course.course}</Typography>
                   <Typography variant="body2">
                     {course.count}/{course.target}
                   </Typography>
                 </Box>
                 <LinearProgress 
                   variant="determinate" 
                   value={course.progress}
                   sx={{
                     height: 8,
                     borderRadius: 5,
                     bgcolor: colors.divider,
                     '& .MuiLinearProgress-bar': {
                       bgcolor: colors.secondary
                     }
                   }}
                 />
               </Box>
             ))}
           </CardContent>
         </Card>

         {/* Recent Activities */}
         <Card>
           <CardContent>
             <Typography variant="h6" sx={{ color: colors.primary, mb: 3 }}>
               Recent Activities
             </Typography>
             {recentActivities.map((section) => (
               <Box key={section.title} mb={3}>
                 <Box display="flex" alignItems="center" mb={2}>
                   <Avatar sx={{ bgcolor: colors.secondary, mr: 1 }}>
                     {section.icon}
                   </Avatar>
                   <Typography variant="subtitle1">{section.title}</Typography>
                 </Box>
                 {section.items.map((item, index) => (
                   <Box key={index} mb={2} ml={5}>
                     {item.avatar ? (
                       <Box display="flex" alignItems="center" gap={2}>
                         <Avatar src={item.avatar} sx={{ width: 32, height: 32 }} />
                         <Box>
                           <Typography variant="body2" sx={{ color: colors.primary }}>
                             {item.name}
                           </Typography>
                           <Typography variant="caption" color="text.secondary">
                             {item.action} • {item.time}
                           </Typography>
                         </Box>
                       </Box>
                     ) : (
                       <Box>
                         <Typography variant="body2" sx={{ color: colors.primary }}>
                           {item.name}
                         </Typography>
                         <Typography variant="caption" color="text.secondary">
                           {item.date} • {item.participants} registered
                         </Typography>
                       </Box>
                     )}
                   </Box>
                 ))}
                 <Divider />
               </Box>
             ))}
           </CardContent>
         </Card>
       </Grid>

       {/* Top Hiring Companies */}
       <Grid item xs={12} md={4}>
         <Card>
           <CardContent>
             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
               <Typography variant="h6" sx={{ color: colors.primary }}>
                 Top Hiring Companies
               </Typography>
               <IconButton size="small">
                 <BarChart />
               </IconButton>
             </Box>
             
             {jobStats.map((company) => (
               <Box 
                 key={company.company} 
                 display="flex" 
                 justifyContent="space-between"
                 alignItems="center"
                 mb={2}
                 p={1.5}
                 sx={{ 
                   bgcolor: colors.divider,
                   borderRadius: 1
                 }}
               >
                 <Typography variant="body2" sx={{ color: colors.primary }}>
                   {company.company}
                 </Typography>
                 <Typography variant="body2" sx={{ color: colors.secondary }}>
                   {company.hires} alumni
                 </Typography>
               </Box>
             ))}

             <Button 
               variant="outlined"
               fullWidth
               endIcon={<ReadMore />}
               sx={{ 
                 mt: 2,
                 color: colors.primary,
                 borderColor: colors.primary,
                 '&:hover': {
                   borderColor: colors.secondary,
                   color: colors.secondary
                 }
               }}
             >
               View Full Report
             </Button>
           </CardContent>
         </Card>
       </Grid>
     </Grid>
   </Box>
 );
};

export default Admin;