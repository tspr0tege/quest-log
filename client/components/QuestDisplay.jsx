import React from 'react';

export default ({ text, edit }) => {
  const handleClick = () => {
    edit(text);
  }

  return (
    <p onClick={handleClick}>{text}</p>
  );
}