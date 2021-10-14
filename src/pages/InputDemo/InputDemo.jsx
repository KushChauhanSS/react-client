import React, { useState } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import { OPTIONS, CRICKET } from '../../configs/constants';

const InputDemo = () => {
  const [playerData, setPlayerData] = useState({
    name: '',
    sport: '',
    cricket: '',
    football: '',
  });

  const handleNameChange = (event) => {
    const { value } = event.target;
    if (value.length <= 20) {
      setPlayerData({ ...playerData, name: value });
    }
  };

  const handleGameChange = (event) => {
    const { value } = event.target;
    setPlayerData({
      ...playerData, sport: value, cricket: '', football: '',
    });
  };

  const handleRoleChange = (event) => {
    const { value } = event.target;
    console.log(event);
    if (playerData.sport === CRICKET) {
      setPlayerData({ ...playerData, cricket: value });
    } else {
      setPlayerData({ ...playerData, football: value });
    }
  };

  console.log(playerData);

  return (
    <>
      <TextField heading="Name" onChange={handleNameChange} value={playerData.name} />
      <SelectField options={OPTIONS} onChange={handleGameChange} value={playerData.sport} />
      {playerData.sport && (
        <RadioGroup
          options={playerData.sport === CRICKET ? OPTIONS[0] : OPTIONS[1]}
          onChange={handleRoleChange}
          value={playerData.sport === CRICKET ? playerData.cricket : playerData.football}
        />
      )}
    </>
  );
};

export default InputDemo;
