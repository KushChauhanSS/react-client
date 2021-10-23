import React from 'react';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';

import { styles } from './style';

const Footer = () => (
  <>
    <p style={styles.footer}>
      <CopyrightOutlinedIcon sx={{ fontSize: 18 }} />
      Successive Technologies
    </p>
  </>
);

export default Footer;
