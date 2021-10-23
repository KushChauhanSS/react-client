import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: '1.5rem' }}
        >
          Trainee Portal
        </Typography>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit" sx={{ fontSize: '0.9rem' }}>Trainee</Button>
        </Link>
        <Link to="/text-field-demo" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit" sx={{ fontSize: '0.9rem' }}>Textfield Demo</Button>
        </Link>
        <Link to="/input-demo" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit" sx={{ fontSize: '0.9rem' }}>Inputfield Demo</Button>
        </Link>
        <Link to="/children-demo" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit" sx={{ fontSize: '0.9rem' }}>Children Demo</Button>
        </Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          <Button color="inherit" sx={{ fontSize: '0.9rem', ml: '1.5rem' }}>Logout</Button>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
