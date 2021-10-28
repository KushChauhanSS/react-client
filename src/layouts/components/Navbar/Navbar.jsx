import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const navbarData = [
  {
    buttonLabel: 'Trainee',
    url: '/',
  },
  {
    buttonLabel: 'Textfield Demo',
    url: '/text-field-demo',
  },
  {
    buttonLabel: 'Inputfield Demo',
    url: '/input-demo',
  },
  {
    buttonLabel: 'Children Demo',
    url: '/children-demo',
  },
  {
    buttonLabel: 'Logout',
    url: '/login',
  },
];

const AddNavbarData = ({ data }) => (
  data.map((item) => (
    <Link key={item.buttonLabel} to={item.url} style={{ color: 'white', textDecoration: 'none' }}>
      <Button color="inherit" sx={{ fontSize: '0.9rem' }}>{item.buttonLabel}</Button>
    </Link>
  ))
);

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
        <AddNavbarData data={navbarData} />
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
