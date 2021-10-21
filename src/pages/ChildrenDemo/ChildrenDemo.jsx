import React from 'react';
import { Math } from '../../components';

const ChildrenDemo = () => (
  <>
    <Math first={7} second={4} operator="+" />
    <Math first={7} second={0} operator="/" />
    <Math first={7} second={4} operator="^" />
    <Math first={7} second={4} operator="+">
      {(obj) => `Sum of ${obj.first} and ${obj.second} is ${obj.result}`}
    </Math>
    <Math first={7} second={4} operator="+">
      {(obj) => `When we add ${obj.first} with ${obj.second} then we will get ${obj.result} as result.`}
    </Math>
  </>
);

export default ChildrenDemo;
