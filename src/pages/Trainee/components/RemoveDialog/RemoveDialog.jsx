import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { SnackBarContext } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const RemoveDialog = (props) => {
  const {
    open, onClose, onDelete, actionState,
  } = props;

  const openSnackBar = useContext(SnackBarContext);

  const handleDeleteClick = () => {
    let message;
    let status;

    const date1 = new Date('14 Feb 2019');
    const date2 = new Date(actionState.createdAt);

    if (date1 <= date2) {
      message = 'This is a success message!';
      status = 'success';
    } else if (date1 > date2) {
      message = 'This is an error message!';
      status = 'error';
    }

    openSnackBar(message, status);
    onDelete();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Remove Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to remove the trainee?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDeleteClick} variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  actionState: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RemoveDialog;
