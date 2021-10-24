import React from 'react';
import PropTypes from 'prop-types';

import { Footer } from '../components';

const AuthLayout = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
