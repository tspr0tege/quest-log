import React from 'react';

import './ProgressBar.css'

const ProgressBar = ({ progress, customStyles }) => {
 
  return (
    <div className="progress-bar" style={customStyles}>
      <div style={{width: progress + '%'}}></div>
    </div> 
  );
}

ProgressBar.defaultProps = {
  customStyles: {}
}

export default ProgressBar;
