import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { AuthLayout } from '../layouts';

const AuthRoute = ({ exact, path, component: Component }) => (
  <Route exact={exact} path={path} render={() => <AuthLayout><Component /></AuthLayout>} />
);

AuthRoute.defaultProps = {
  exact: false,
};

AuthRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default AuthRoute;
