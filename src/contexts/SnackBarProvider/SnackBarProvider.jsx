import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// eslint-disable-next-line react/jsx-props-no-spreading
const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />);

export const SnackBarContext = React.createContext();

const SnackBarProvider = (props) => {
  const { children } = props;
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    snackBarMessage: '',
    snackBarStatus: '',
  });

  const openSnackBar = (message, status) => {
    setSnackBarState({
      ...snackBarState,
      open: true,
      snackBarMessage: message,
      snackBarStatus: status,
    });
  };

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarState({ ...snackBarState, open: false });
  };

  return (
    <>
      <SnackBarContext.Provider value={openSnackBar}>
        {children}
      </SnackBarContext.Provider>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={snackBarState.open} autoHideDuration={3000} onClose={closeSnackBar}>
          <Alert
            icon={snackBarState.snackBarStatus === 'success' ? <CheckCircleIcon fontSize="small" /> : <ErrorIcon fontSize="small" />}
            onClose={closeSnackBar}
            variant="filled"
            severity={snackBarState.snackBarStatus}
            sx={{ width: '100%' }}
          >
            {snackBarState.snackBarMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SnackBarProvider;
