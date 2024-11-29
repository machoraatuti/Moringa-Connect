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
         <Card>
           <CardMedia
             component="img"
             height="140"
             image={post.image}
             alt={post.title}
           />
           <CardContent>
             <Typography variant="subtitle2" color="text.secondary">
               {post.date}
             </Typography>
             <Typography variant="h6" gutterBottom>
               {post.title}
             </Typography>
             <Chip label={post.category} size="small" sx={{ mb: 2 }} />
             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
               <IconButton size="small" color="primary">
                 <Edit />
               </IconButton>
               <IconButton size="small" color="error">
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
   <TableContainer component={Paper}>
     <Table>
       <TableHead>
         <TableRow sx={{ bgcolor: '#1a237e' }}>
           <TableCell sx={{ color: 'white' }}>Date Created</TableCell>
           <TableCell sx={{ color: 'white' }}>Image</TableCell>
           <TableCell sx={{ color: 'white' }}>Title</TableCell>
           <TableCell sx={{ color: 'white' }}>Category</TableCell>
           <TableCell sx={{ color: 'white' }}>Actions</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {posts.map((post) => (
           <TableRow key={post.id}>
             <TableCell>{post.date}</TableCell>
             <TableCell>
               <img 
                 src={post.image} 
                 alt={post.title} 
                 style={{ width: 50, height: 50, objectFit: 'cover' }} 
               />
             </TableCell>
             <TableCell>{post.title}</TableCell>
             <TableCell>
               <Chip label={post.category} size="small" />
             </TableCell>
             <TableCell>
               <IconButton color="primary">
                 <Edit />
               </IconButton>
               <IconButton color="error">
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
   <Box p={2}>
     {isMobile ? <MobileView /> : <DesktopView />}
   </Box>
 );
};

export default Posts;