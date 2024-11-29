import React, { useState } from 'react';
import { 
 Box,
 TableContainer,
 Table,
 TableHead,
 TableBody,
 TableRow,
 TableCell,
 Paper,
 IconButton,
 TextField,
 Tooltip,
 Typography
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const Groups = () => {
 const [searchTerm, setSearchTerm] = useState('');
 
 const groups = [
   {
     id: 1,
     name: 'React Developers',
     dateCreated: '2024-01-15',
     members: 45,
     description: 'A group for React enthusiasts and developers'
   },
   {
     id: 2,
     name: 'UI/UX Design',
     dateCreated: '2024-01-16',
     members: 32,
     description: 'Discuss UI/UX design principles and trends'
   }
 ];

 const filteredGroups = groups.filter(group => 
   group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   group.description.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
   <Box p={2}>
     <Box mb={3}>
       <TextField
         fullWidth
         label="Search Groups"
         variant="outlined"
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
       />
     </Box>

     <TableContainer component={Paper}>
       <Table>
         <TableHead>
           <TableRow sx={{ bgcolor: '#1a237e' }}>
             <TableCell sx={{ color: 'white' }}>Group Name</TableCell>
             <TableCell sx={{ color: 'white' }}>Date Created</TableCell>
             <TableCell sx={{ color: 'white' }}>Members</TableCell>
             <TableCell sx={{ color: 'white' }}>Description</TableCell>
             <TableCell sx={{ color: 'white' }}>Actions</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {filteredGroups.map((group) => (
             <TableRow key={group.id}>
               <TableCell>
                 <Typography variant="subtitle1">{group.name}</Typography>
               </TableCell>
               <TableCell>{group.dateCreated}</TableCell>
               <TableCell>{group.members}</TableCell>
               <TableCell>{group.description}</TableCell>
               <TableCell>
                 <Tooltip title="View">
                   <IconButton color="primary">
                     <Visibility />
                   </IconButton>
                 </Tooltip>
                 <Tooltip title="Edit">
                   <IconButton color="primary">
                     <Edit />
                   </IconButton>
                 </Tooltip>
                 <Tooltip title="Delete">
                   <IconButton color="error">
                     <Delete />
                   </IconButton>
                 </Tooltip>
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
   </Box>
 );
};

export default Groups;