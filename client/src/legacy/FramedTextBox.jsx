import React from 'react';

import './FramedTextBox.css'

export default ({ name, placeholder }) => (
  <input 
    className="gold-frame" 
    type="text" 
    name={name} 
    placeholder={placeholder}
  />
);