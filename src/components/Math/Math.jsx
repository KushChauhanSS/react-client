import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const Math = (props) => {
  const {
    first,
    second,
    operator,
    children,
  } = props;

  const evaluateResult = (operand1, operand2, operatorArgs) => {
    if (operatorArgs === '+') {
      return operand1 + operand2;
    }
    if (operatorArgs === '-') {
      return operand1 - operand2;
    }
    if (operatorArgs === '*') {
      return operand1 * operand2;
    }
    if (operatorArgs === '/') {
      return operand1 / operand2;
    }
    return 'Invalid Operation';
  };

  const result = evaluateResult(first, second, operator);

  return (
    <Typography>
      {children ? children({
        first, second, operator, result,
      }) : `${first} ${operator} ${second} = ${result}`}
    </Typography>
  );
};

Math.defaultProps = {
  children: null,
};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

export default Math;
