import React, { useState } from 'react';
import {
  Grid, Paper, Avatar, TextField, Button,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';

import { styles } from './style';
import { loginFormValidationSchema } from '../../validations/validation';
import { hasErrors, isTouched } from './helper';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
    touched: {
      email: false,
      password: false,
    },
    errors: {},
  };

  const [loginFormData, setLoginFormData] = useState(initialState);

  const validateLoginFormData = async (value, type) => {
    try {
      await loginFormValidationSchema.validate({
        ...loginFormData, [type]: value,
      }, {
        abortEarly: false,
      });
      setLoginFormData({
        ...loginFormData,
        [type]: value,
        touched: { ...loginFormData.touched, [type]: true },
        errors: {},
      });
    } catch (err) {
      const formErrors = {};
      if (err) {
        err.inner.forEach((errorItem) => {
          formErrors[errorItem.path] = errorItem.message;
        });
      }
      setLoginFormData({
        ...loginFormData,
        [type]: value,
        touched: { ...loginFormData.touched, [type]: true },
        errors: formErrors,
      });
    }
  };

  const handleChange = (event) => {
    const { value, name: type } = event.target;
    validateLoginFormData(value, type);
  };

  const handleBlur = (event) => {
    const { value, name: type } = event.target;
    validateLoginFormData(value, type);
  };

  console.log('loginFormData', loginFormData);

  return (
    <Grid>
      <Paper
        elevation={3}
        style={styles.paperStyle}
      >
        <Grid align="center">
          <Avatar sx={{ backgroundColor: '#f24341' }}>
            <LockOutlinedIcon fontSize="small" />
          </Avatar>
          <h2 style={styles.loginFormHeading}>Login</h2>
        </Grid>
        <TextField
          margin="dense"
          type="email"
          name="email"
          value={loginFormData.email}
          id="outlined-required-name-field"
          label="Email Address"
          fullWidth
          InputProps={{
            style: { fontSize: 20 },
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: '#212121', fontSize: '22px' }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ style: { fontSize: 20 } }}
          sx={{ mt: '1rem' }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={(loginFormData.errors.email && loginFormData.touched.email)}
          helperText={loginFormData.touched.email && loginFormData.errors.email}
        />
        <TextField
          margin="dense"
          type="password"
          name="password"
          value={loginFormData.password}
          id="outlined-required-email-field"
          label="Password"
          fullWidth
          InputProps={{
            style: { fontSize: 20 },
            startAdornment: (
              <InputAdornment position="start">
                <VisibilityOffIcon sx={{ color: '#212121', fontSize: '22px' }} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ style: { fontSize: 20 } }}
          sx={{ mt: '1rem' }}
          onChange={handleChange}
          onBlur={handleBlur}
          error={(loginFormData.errors.password && loginFormData.touched.password)}
          helperText={loginFormData.touched.password && loginFormData.errors.password}
        />
        <Link to="/trainee" style={{ color: 'white', textDecoration: 'none' }}>
          <Button variant="contained" disabled={!(!hasErrors(loginFormData) && isTouched(loginFormData))} fullWidth sx={{ mt: '2.4rem' }}>
            Sign In
          </Button>
        </Link>
      </Paper>
    </Grid>
  );
};

export default Login;
