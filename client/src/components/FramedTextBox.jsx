import React from 'react';

import './FramedTextBox.css'

export default ({ name, placeHolder }) => (
  <input 
    className="gold-frame" 
    type="text" 
    name={name} 
    placeholder={placeHolder}
  />
);