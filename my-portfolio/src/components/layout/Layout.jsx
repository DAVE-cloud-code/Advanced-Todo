import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar/>
      <Box
        component="main"
        sx={{
          flexGrow: 0,
          transition: theme => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Box sx={{ mt: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;