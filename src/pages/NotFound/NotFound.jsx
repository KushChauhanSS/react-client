import React from 'react';
import { Grid } from '@mui/material';

import { styles } from './style';

const NotFound = () => (
  <Grid align="center">
    <h1 style={styles.notFoundHeading}>Not Found</h1>
    <p style={styles.message}>Seems like the page you are looking after does not exist</p>
  </Grid>
);

export default NotFound;
