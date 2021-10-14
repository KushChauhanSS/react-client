import React from 'react';
import PropTypes from 'prop-types';
import { styles } from './style';
import './style.css';

const TextField = (props) => {
  const {
    heading, value, error, disabled, onChange,
  } = props;

  return (
    <>
      <h4 style={styles.heading}>{heading}</h4>
      <input
        style={error ? { ...styles.basicInput, ...styles.inputWithErrors } : styles.basicInput}
        type="text"
        name="inputField"
        value={value}
        error={error}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <p style={styles.errorMessage}>{error}</p>}
    </>
  );
};

TextField.defaultProps = {
  error: '',
  disabled: false,
};

TextField.propTypes = {
  heading: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
