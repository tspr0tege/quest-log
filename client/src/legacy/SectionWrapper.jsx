import React from 'react';

import './SectionWrapper.css';

export default ({ title, children, id=null }) => (
  <div id={id} className="section-wrapper">
    <div className="section-header">
      <h2>{title}</h2>
    </div>
    <div className="section-body">
      {children}
    </div>
  </div>
)