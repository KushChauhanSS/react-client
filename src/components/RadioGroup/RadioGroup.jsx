import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error,
    value,
    onChange,
    onBlur,
    options,
  } = props;

  return (
    <>
      <h4>What you do?</h4>
      {options.role.map((option) => (
        <React.Fragment key={option.value}>
          <input type="radio" id={option.value} name={options.value} value={option.value} onChange={onChange} onBlur={onBlur} checked={value === option.value} />
          <label htmlFor={option.value}>{option.label}</label>
          <br />
        </React.Fragment>
      ))}
      {error.length > 0 && <p className="errorMessage">{error}</p>}
    </>
  );
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};

RadioGroup.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    role: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default RadioGroup;
