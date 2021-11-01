import React, { useContext } from 'react';
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

import { SnackBarContext } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const EditDialog = (props) => {
  const {
    open, value, onChange, onClose, onSubmit,
  } = props;

  const openSnackBar = useContext(SnackBarContext);

  const handleSubmitClick = () => {
    openSnackBar('This is a success message!', 'success');
    onSubmit();
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
          <Button onClick={handleSubmitClick} variant="contained">Submit</Button>
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
