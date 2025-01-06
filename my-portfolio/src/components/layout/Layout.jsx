import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from '../../../../src/components/layout/Sidebar';
import { DRAWER_WIDTH } from '../../constants/layout';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={handleSidebarToggle} open={sidebarOpen} />
      <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
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