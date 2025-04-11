import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck'; // Este ícono representa validación/precio

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg,rgb(40, 127, 240) 0%,rgb(16, 104, 219) 100%)',
        boxShadow: 50,
      }}
    >
      <Toolbar>
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;