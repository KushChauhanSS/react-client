import React from 'react';
import {
  Box, Paper, Button, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import trainees from './data/trainee';

const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

const TraineeDetail = (props) => {
  const { match: { params: { id } } } = props;

  let person = {};

  trainees.forEach((item) => {
    if (item.id === id) {
      person = { ...item };
    }
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Paper elevation={3} sx={{ display: 'flex', width: 1 }}>
        <Box backgroundColor="#676666" borderRadius="4px 0 0 4px">
          <Typography mx={6} my={8} fontSize="12px" fontFamily="inherit" color="whitesmoke">
            Thumbnail
          </Typography>
        </Box>
        <Box p={1.5}>
          <Typography variant="h6">{person.name}</Typography>
          <Typography variant="subtitle1" fontSize="1rem" color="GrayText">{getDateFormatted(person.createdAt)}</Typography>
          <Typography variant="subtitle2" fontSize="0.9rem">{person.email}</Typography>
        </Box>
      </Paper>
      <Link to="/trainee" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            width: 100,
            '&:hover': {
              background: 'lightgray',
            },
            mt: 4,
          }}
        >
          BACK
        </Button>
      </Link>
    </Box>
  );
};

TraineeDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default TraineeDetail;
