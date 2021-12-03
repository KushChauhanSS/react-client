import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';

import { SnackBarContext } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import { DELETE_TRAINEE } from '../../mutation';
import { GET_TRAINEES } from '../../query';

const RemoveDialog = (props) => {
  const {
    open, onClose, onDelete, actionState, page, dataLength, handlePageNavigation,
  } = props;

  const [loading, setLoading] = useState(false);

  const openSnackBar = useContext(SnackBarContext);

  const [removeTrainee] = useMutation(DELETE_TRAINEE, { refetchQueries: [GET_TRAINEES] });

  const handleDeleteClick = async () => {
    try {
      setLoading(true);
      await removeTrainee(
        { variables: { id: actionState.originalId } },
      );
      setLoading(false);
      onClose();
      openSnackBar('Trainee deleted successfully!', 'success');
      if (dataLength === 1 && page > 0) {
        handlePageNavigation(null, page - 1);
      }
      onDelete();
    } catch (error) {
      setLoading(false);
      onClose();
      openSnackBar(error.message, 'error');
    }
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
          <LoadingButton loading={loading} variant="contained" onClick={handleDeleteClick}>Delete</LoadingButton>
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
  page: PropTypes.number.isRequired,
  dataLength: PropTypes.number.isRequired,
  handlePageNavigation: PropTypes.func.isRequired,
};

export default RemoveDialog;
