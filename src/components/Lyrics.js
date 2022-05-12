import React from 'react';
import Dropdown from './Dropdown';

const Lyrics = () => {
  const data = [{text: 'Test1', value: 'Test1'},{text: 'Test2', value: 'Test2'},{text: 'Test3', value: 'Test3'}]
  return (
    <div>
      <h2>Lyrics</h2>
      <Dropdown placeholder="Book" options={data}/>
    </div>
  );
};

export default Lyrics;
