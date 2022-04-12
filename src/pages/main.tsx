import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const Main: React.FC = () => (
  <>
    <Navbar />
    <Box component="main">
      <Outlet />
    </Box>
  </>
);

export default Main;
