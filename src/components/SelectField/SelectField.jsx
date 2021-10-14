import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SelectField = (props) => {
  const {
    error,
    value,
    onChange,
    options,
    defaultText,
  } = props;
  return (
    <>
      <label className="selectFieldLabel" htmlFor="game">
        Select the game you play?
        <select className="selectGame" name="game" id="game" error={error} onChange={onChange} value={value}>
          <option value="">{defaultText}</option>
          {options.map((game) => (
            <option key={game.value} value={game.value}>{game.label}</option>
          ))}
        </select>
      </label>
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
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
};

export default SelectField;
