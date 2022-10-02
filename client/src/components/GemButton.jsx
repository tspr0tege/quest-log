import React from 'react';

import './GemButton.css';

export default ({ face, onClick=()=>{}, disabled, id }) => (
  <button
    className="gem-btn"
    onClick={onClick}
    disabled={disabled || false}
    id={id || null}
  >
    {face}
  </button>
)
