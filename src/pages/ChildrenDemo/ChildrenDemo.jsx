import React from 'react';
import { Math } from '../../components';

const customTemplate = (obj) => {
  if (obj.operator === '+') {
    return `Sum of ${obj.first} and ${obj.second} is ${obj.result}`;
  }
  if (obj.operator === '-') {
    return `Difference of ${obj.first} and ${obj.second} is ${obj.result}`;
  }
  if (obj.operator === '*') {
    return `Multiply of ${obj.first} and ${obj.second} is ${obj.result}`;
  }
  if (obj.operator === '/') {
    return `Division of ${obj.first} and ${obj.second} is ${obj.result}`;
  }
  return `Invalid Operation : ${obj.operator}`;
};

const ChildrenDemo = () => (
  <>
    <Math first={7} second={4} operator="+" />
    <Math first={7} second={4} operator="+">
      {customTemplate}
    </Math>
  </>
);

export default ChildrenDemo;
