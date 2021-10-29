import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route,
} from 'react-router-dom';

import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const Trainee = ({ path }) => (
  <>
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route exact path={`${path}/:id`} component={TraineeDetail} />
    </Switch>
  </>
);

Trainee.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Trainee;
