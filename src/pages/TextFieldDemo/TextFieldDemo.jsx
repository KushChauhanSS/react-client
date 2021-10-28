import React from 'react';
import { TextField, Slider } from '../../components';
import { BANNERS } from '../../configs/constants';

const TextFieldDemo = () => (
  <div>
    <Slider banners={BANNERS} height={234} />
    <TextField heading="This is a Disabled Input" value="Disabled Input" disabled />
    <TextField heading="A Valid Input" value="Accessible" />
    <TextField heading="An Input with errors" value="101" error="Could not be greater than" />
  </div>
);

export default TextFieldDemo;
