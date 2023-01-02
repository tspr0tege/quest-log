import React from 'react';

export default ({ children, onClick=()=>{}, disabled, id }) => (
  <button
    // className="gem-btn"
    onClick={onClick}
    disabled={disabled || false}
    id={id || null}
  >
    {children}
  </button>
)
