/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';

const withLoaderAndMessage = (Component) => {
  const EnhancedComponent = (props) => {
    const { loading, dataLength, ...rest } = props;
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (dataLength < 1) {
      return (<Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>OOPS!, No More Trainees</Typography>);
    }
    return (
      <Component {...rest} />
    );
  };

  EnhancedComponent.propTypes = {
    loading: PropTypes.bool.isRequired,
    dataLength: PropTypes.number.isRequired,
  };

  return EnhancedComponent;
};

export default withLoaderAndMessage;
