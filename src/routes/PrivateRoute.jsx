import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { PrivateLayout } from '../layouts';

const PrivateRoute = (props) => {
  const { exact, path, component: Component } = props;
  return (
    <Route exact={exact} path={path} render={() => <PrivateLayout><Component /></PrivateLayout>} />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired,
};

export default PrivateRoute;
