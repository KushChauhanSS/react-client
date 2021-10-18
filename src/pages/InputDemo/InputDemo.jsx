import React, { useState } from 'react';
import {
  TextField,
  SelectField,
  RadioGroup,
  Button,
} from '../../components';
import { OPTIONS, CRICKET } from '../../configs/constants';
import { validationSchema } from '../../validations/validation';
import { hasErrors, isTouched, getError } from '../../helpers/helper';
import { styles } from './style';

const InputDemo = () => {
  const [playerData, setPlayerData] = useState({
    name: {
      value: '',
      isTouched: false,
      hasErrors: false,
    },
    sport: {
      value: '',
      isTouched: false,
      hasErrors: false,
    },
    cricket: {
      value: '',
      isTouched: false,
      hasErrors: false,
    },
    football: {
      value: '',
      isTouched: false,
      hasErrors: false,
    },
  });

  const handleNameChange = (event) => {
    const { value, name } = event.target;
    if (value.length <= 20) {
      setPlayerData({ ...playerData, [name]: { ...playerData[name], value } });
    }
  };

  const handleGameChange = (event) => {
    const { value, name } = event.target;
    setPlayerData({
      ...playerData,
      [name]: { ...playerData[name], value },
      cricket: { ...playerData.cricket, value: '' },
      football: { ...playerData.football, value: '' },
    });
  };

  const handleRoleChange = (event) => {
    const { value, name } = event.target;
    setPlayerData({ ...playerData, [name]: { ...playerData[name], value } });
  };

  console.log(playerData);

  const handleOnBlur = async (event) => {
    const {
      value, name, type, checked,
    } = event.target;

    let isValid;

    if (type === 'radio') {
      if (checked) {
        isValid = await validationSchema.isValid({ [name]: value });
      } else {
        isValid = false;
      }
    } else {
      isValid = await validationSchema.isValid({ [name]: value });
    }

    console.log('isValid', isValid);

    setPlayerData({
      ...playerData, [name]: { ...playerData[name], hasErrors: !isValid, isTouched: true },
    });
  };

  return (
    <>
      <TextField
        heading="Name"
        value={playerData.name.value}
        onChange={handleNameChange}
        onBlur={handleOnBlur}
        error={playerData.name.hasErrors ? getError('Name') : ''}
      />
      <SelectField
        options={OPTIONS}
        value={playerData.sport.value}
        onChange={handleGameChange}
        onBlur={handleOnBlur}
        error={playerData.sport.hasErrors ? getError('Sport') : ''}
      />
      {playerData.sport.value && (
        <RadioGroup
          options={playerData.sport.value === CRICKET ? OPTIONS[0] : OPTIONS[1]}
          onChange={handleRoleChange}
          value={
            playerData.sport.value === CRICKET
              ? playerData.cricket.value
              : playerData.football.value
          }
          onBlur={handleOnBlur}
          error={(playerData.cricket.hasErrors || playerData.football.hasErrors) ? getError('What you do') : ''}
        />
      )}
      <div style={styles.buttonComponent}>
        <Button
          color="default"
          value="Cancel"
          onClick={() => { console.log('Cancel Button Clicked'); }}
          style={{ marginRight: '10px' }}
        />
        <Button
          color="primary"
          value="Submit"
          onClick={() => { console.log('Submit Button Clicked'); }}
          disabled={!(!hasErrors(playerData) && isTouched(playerData))}
        />
      </div>
    </>
  );
};

export default InputDemo;
