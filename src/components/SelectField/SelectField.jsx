import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SelectField = (props) => {
  const {
    error,
    value,
    onChange,
    onBlur,
    options,
    defaultText,
  } = props;
  console.log('error.length', error.length);
  return (
    <>
      <label className="selectFieldLabel" htmlFor="game">
        Select the game you play?
        <select className={error.length > 0 ? 'selectWithError' : 'selectGame'} name="sport" id="game" value={value} onChange={onChange} onBlur={onBlur}>
          <option value="">{defaultText}</option>
          {options.map((game) => (
            <option key={game.value} value={game.value}>{game.label}</option>
          ))}
        </select>
      </label>
      {error.length > 0 && <p className="errorMessage">{error}</p>}
    </>
  );
};

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
};

export default SelectField;
