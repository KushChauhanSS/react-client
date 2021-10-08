import React from 'react';
import PropTypes from 'prop-types';
import { styles } from './style';
import './style.css';

const TextField = (props) => {
  const {
    heading, value, error, disabled,
  } = props;

  let inputStyle;

  if (disabled) {
    inputStyle = styles.diabledInput;
  } else if (!disabled && !error) {
    inputStyle = styles.validInput;
  } else {
    inputStyle = styles.inputWithErrors;
  }
  return (
    <>
      <h4 style={styles.heading}>{heading}</h4>
      <input
        style={inputStyle}
        type="text"
        name="inputField"
        value={value}
        error={error}
        disabled={disabled}
      />
      {error && <p style={styles.errorMessage}>{error}</p>}
    </>
  );
};

TextField.propTypes = {
  heading: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
};

export default TextField;
