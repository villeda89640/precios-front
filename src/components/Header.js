import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import PriceCheckIcon from '@mui/icons-material/PriceCheck'; // Ícono de validación/precio

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(90deg, rgb(40, 127, 240) 0%, rgb(16, 104, 219) 100%)',
        boxShadow: 3,
      }}
    >
      <Toolbar>
        <PriceCheckIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;