import React, { useState } from 'react';
import { 
 Box,
 Grid,
 Card,
 CardContent,
 CardMedia,
 Typography,
 IconButton,
 Chip,
 useTheme,
 useMediaQuery,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Paper
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

// Moringa color scheme
const colors = {
 primary: '#0A1F44', // Navy blue
 secondary: '#F05A28', // Orange
 background: '#FFF5F2', // Light peach
 white: '#FFFFFF',
 divider: 'rgba(240, 90, 40, 0.12)' // Semi-transparent orange
};

const Posts = () => {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

 const posts = [
   {
     id: 1,
     date: '2024-01-15',
     image: 'https://via.placeholder.com/150',
     title: 'Getting Started with React',
     category: 'Development',
   },
   {
     id: 2, 
     date: '2024-01-16',
     image: 'https://via.placeholder.com/150',
     title: 'UI Design Tips',
     category: 'Design',
   }
 ];

 const MobileView = () => (
   <Grid container spacing={2}>
     {posts.map((post) => (
       <Grid item xs={12} key={post.id}>
         <Card sx={{ 
           boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
           '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.15)' },
           transition: 'box-shadow 0.3s',
           border: `1px solid ${colors.divider}`
         }}>
           <CardMedia
             component="img"
             height="180"
             image={post.image}
             alt={post.title}
             sx={{ objectFit: 'cover' }}
           />
           <CardContent>
             <Typography 
               variant="subtitle2" 
               sx={{ color: colors.secondary, mb: 1 }}
             >
               {post.date}
             </Typography>
             <Typography 
               variant="h6" 
               gutterBottom
               sx={{ color: colors.primary, fontWeight: 600 }}
             >
               {post.title}
             </Typography>
             <Chip 
               label={post.category} 
               size="small" 
               sx={{ 
                 mb: 2,
                 bgcolor: colors.primary,
                 color: colors.white,
                 fontWeight: 500
               }} 
             />
             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
               <IconButton 
                 size="small" 
                 sx={{ 
                   color: colors.primary,
                   '&:hover': { bgcolor: colors.divider }
                 }}
               >
                 <Edit />
               </IconButton>
               <IconButton 
                 size="small" 
                 sx={{ 
                   color: '#d32f2f',
                   '&:hover': { bgcolor: '#ffebee' }
                 }}
               >
                 <Delete />
               </IconButton>
             </Box>
           </CardContent>
         </Card>
       </Grid>
     ))}
   </Grid>
 );

 const DesktopView = () => (
   <TableContainer 
     component={Paper}
     sx={{ 
       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
       border: `1px solid ${colors.divider}`
     }}
   >
     <Table>
       <TableHead>
         <TableRow sx={{ bgcolor: colors.primary }}>
           <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Date Created</TableCell>
           <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Image</TableCell>
           <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Title</TableCell>
           <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Category</TableCell>
           <TableCell sx={{ color: colors.white, fontWeight: 600 }}>Actions</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {posts.map((post) => (
           <TableRow 
             key={post.id}
             sx={{ '&:hover': { bgcolor: colors.background } }}
           >
             <TableCell sx={{ color: colors.secondary }}>{post.date}</TableCell>
             <TableCell>
               <img 
                 src={post.image} 
                 alt={post.title} 
                 style={{ 
                   width: 60, 
                   height: 60, 
                   objectFit: 'cover',
                   borderRadius: '4px',
                   border: `2px solid ${colors.divider}`
                 }} 
               />
             </TableCell>
             <TableCell sx={{ color: colors.primary, fontWeight: 500 }}>
               {post.title}
             </TableCell>
             <TableCell>
               <Chip 
                 label={post.category} 
                 size="small"
                 sx={{ 
                   bgcolor: colors.primary,
                   color: colors.white,
                   fontWeight: 500
                 }}
               />
             </TableCell>
             <TableCell>
               <IconButton 
                 sx={{ 
                   color: colors.primary,
                   '&:hover': { bgcolor: colors.divider }
                 }}
               >
                 <Edit />
               </IconButton>
               <IconButton 
                 sx={{ 
                   color: '#d32f2f',
                   '&:hover': { bgcolor: '#ffebee' }
                 }}
               >
                 <Delete />
               </IconButton>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 );

 return (
   <Box p={2} sx={{ bgcolor: colors.background, minHeight: '100vh' }}>
     <Typography 
       variant="h4" 
       sx={{ 
         color: colors.primary,
         mb: 3,
         fontWeight: 600
       }}
     >
       Posts
     </Typography>
     {isMobile ? <MobileView /> : <DesktopView />}
   </Box>
 );
};

export default Posts;