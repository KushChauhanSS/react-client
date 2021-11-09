import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';

import { hasErrors, isTouched } from '../../helper';
import { SnackBarContext } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import { callAPi } from '../../../../libs/utils/api';

const AddDialog = (props) => {
  const {
    open,
    onClose,
    onSubmit,
    onClick,
    onChange,
    onBlur,
    data,
  } = props;

  const [loading, setLoading] = useState(false);

  const openSnackBar = useContext(SnackBarContext);

  const handleSubmitClick = async () => {
    try {
      setLoading(true);
      await callAPi(
        'users',
        'post',
        { Authorization: window.localStorage.getItem('token') },
        null,
        {
          name: data.name, email: data.email, role: 'head-trainer', password: data.password,
        },
      );
      setLoading(false);
      onClose();
      openSnackBar('Trainee added successfully', 'success');
      onSubmit();
    } catch (error) {
      setLoading(false);
      onClose();
      openSnackBar(error.message, 'error');
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={onClick} sx={{ mx: '0.5rem' }}>
        ADD TRAINEE
      </Button>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={{ mt: '8rem' }}>
        <DialogTitle>Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your trainee details</DialogContentText>
          <TextField
            required
            margin="dense"
            type="text"
            name="name"
            value={data.name}
            id="outlined-required"
            label="Name"
            fullWidth
            InputProps={{
              style: { fontSize: 20 },
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: '#212121', fontSize: '22px' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { fontSize: 20 } }}
            sx={{ mt: '1rem' }}
            onChange={onChange}
            onBlur={onBlur}
            error={(data.errors.name && data.touched.name)}
            helperText={data.touched.name && data.errors.name}
          />
          <TextField
            margin="dense"
            type="email"
            name="email"
            value={data.email}
            id="outlined-required"
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
            onChange={onChange}
            onBlur={onBlur}
            error={(data.errors.email && data.touched.email)}
            helperText={data.touched.email && data.errors.email}
          />
          <Box>
            <TextField
              margin="dense"
              type="password"
              name="password"
              value={data.password}
              id="outlined-required"
              label="Password"
              InputProps={{
                style: { fontSize: 20 },
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityOffIcon sx={{ color: '#212121', fontSize: '22px' }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              sx={{ width: 1 / 2, pr: '0.5rem', mt: '1rem' }}
              onChange={onChange}
              onBlur={onBlur}
              error={(data.errors.password && data.touched.password)}
              helperText={data.touched.password && data.errors.password}
            />
            <TextField
              margin="dense"
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              id="outlined-required"
              label="Confirm Password"
              InputProps={{
                style: { fontSize: 20 },
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityOffIcon sx={{ color: '#212121', fontSize: '22px' }} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { fontSize: 20 } }}
              sx={{ width: 1 / 2, mt: '1rem' }}
              onChange={onChange}
              onBlur={onBlur}
              error={(data.errors.confirmPassword && data.touched.confirmPassword)}
              helperText={data.touched.confirmPassword && data.errors.confirmPassword}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton loading={loading} variant="contained" disabled={!(!hasErrors(data) && isTouched(data))} onClick={handleSubmitClick}>
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    touched: PropTypes.objectOf(PropTypes.bool),
    errors: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default AddDialog;
