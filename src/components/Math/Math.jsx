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
    return 'Invalid Operator';
  };

  const result = evaluateResult(first, second, operator);

  return (
    <Typography>
      {children({
        first, second, operator, result,
      })}
    </Typography>
  );
};

const defaultTemplate = (obj) => {
  if (obj.operator === '+') {
    return `${obj.first} + ${obj.second} = ${obj.result}`;
  }
  if (obj.operator === '-') {
    return `${obj.first} - ${obj.second} = ${obj.result}`;
  }
  if (obj.operator === '*') {
    return `${obj.first} * ${obj.second} = ${obj.result}`;
  }
  if (obj.second === 0 && obj.operator === '/') {
    return `${obj.first} / ${obj.second} = ${obj.result}`;
  }
  if (obj.operator === '/') {
    return `${obj.first} / ${obj.second} = ${obj.result}`;
  }
  return `Invalid Operation : ${obj.operator}`;
};

Math.defaultProps = {
  children: defaultTemplate,
};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

export default Math;
