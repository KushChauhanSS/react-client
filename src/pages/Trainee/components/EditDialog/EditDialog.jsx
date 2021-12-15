import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { LoadingButton } from '@mui/lab';

import { SnackBarContext } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import { callAPi } from '../../../../libs/utils/api';

const EditDialog = (props) => {
  const {
    open, value, onChange, onClose, onSubmit,
  } = props;

  const [loading, setLoading] = useState(false);

  const openSnackBar = useContext(SnackBarContext);

  const handleSubmitClick = async () => {
    try {
      setLoading(true);
      await callAPi(
        'users',
        'put',
        { Authorization: window.localStorage.getItem('token') },
        null,
        {
          originalId: value.originalId, name: value.name, email: value.email,
        },
      );
      setLoading(false);
      onClose();
      openSnackBar('Trainee edited successfully', 'success');
      onSubmit();
    } catch (error) {
      setLoading(false);
      onClose();
      openSnackBar('Trainee edited successfully', 'error');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" sx={{ mt: '8rem' }}>
        <DialogTitle>Edit Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your trainee details</DialogContentText>
          <TextField
            required
            margin="dense"
            type="text"
            name="name"
            value={value.name}
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
          />
          <TextField
            margin="dense"
            type="email"
            name="email"
            value={value.email}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton loading={loading} variant="contained" onClick={handleSubmitClick}>Submit</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  value: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditDialog;
