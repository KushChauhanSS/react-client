import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const RemoveDialog = (props) => {
  const { open, onClose, onDelete } = props;
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to remove the trainee?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onDelete} variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RemoveDialog;
