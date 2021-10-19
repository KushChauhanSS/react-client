import React from 'react';
import PropTypes from 'prop-types';
import { styles } from './style';

const Button = (props) => {
  const {
    color,
    disabled,
    style,
    value,
    onClick,
  } = props;

  return (
    <button
      type={value === 'Submit' ? 'submit' : 'button'}
      style={(color === 'primary' && disabled === false) ? { ...styles.basicButton, ...styles.buttonPrimary, ...style } : { ...styles.basicButton, ...style }}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

Button.defaultProps = {
  color: 'default',
  disabled: false,
  style: {},
};

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
