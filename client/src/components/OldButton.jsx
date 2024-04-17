import React from 'react';

export default ({ children, onClick=()=>{}, disabled=false, id=null }) => (
  <button
    // className="gem-btn"
    onClick={onClick}
    disabled={disabled}
    id={id}
  >
    {children}
  </button>
)
