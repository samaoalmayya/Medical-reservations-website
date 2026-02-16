import * as React from 'react';
import Box from '@mui/material/Box';




import CssBaseline from '@mui/material/CssBaseline';


import Topbar from './Component/Topbar';
import Drawar from './Component/Drawar';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




export default function MiniDrawer() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar open={open} handleDrawerOpen={handleDrawerOpen}></Topbar>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
         <Drawar  open={open} handleDrawerClose={handleDrawerClose}>
         </Drawar>
         </Box>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       <Outlet></Outlet>
      </Box>
    </Box>
  );
}
