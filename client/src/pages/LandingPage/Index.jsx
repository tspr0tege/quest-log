import React from 'react';

import './LandingPage.css';

const temporaryButtonStyle = {
  fontWeight: '600',
  padding: '15px 30px',
  fontSize: '30px',
  boxSizing: 'content-box',
  borderRadius: '50px',
  margin: '60px',
  backgroundColor: 'var(--goldBrown)',
};

export default () => (
  <div id='landing-page'>
    <div>
      <h1>A Personal Productivity App for gamers</h1>
      <p>Experience your life as an adventure!</p>
      {/* Create a reuseable button component */}
      <button style={temporaryButtonStyle}>Login/Sign-up</button>
    </div>
    <img src='https://i.ibb.co/VgHTkTg/bg-dark-torch.jpg' />
  </div>  
)