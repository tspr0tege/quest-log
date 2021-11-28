import React from 'react';

export default ({ handleClick }) => (
  <form>
    <input type="text" name="text" placeholder="Enter a new task"/>
    <button onClick={handleClick}>Click</button>
  </form>
)