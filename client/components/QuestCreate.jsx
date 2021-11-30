import React from 'react';

const advance = (e) => {
  e.preventDefault();
  console.log('Advanced Edit');
}

export default ({ handleClick }) => (
  <form>
    <input type="text" name="text" placeholder="Enter a new task"/>
    <button onClick={handleClick}>Create</button>
    <button onClick={advance}>+Create</button>
  </form>
)