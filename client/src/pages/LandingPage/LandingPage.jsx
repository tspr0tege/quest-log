import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

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

export default () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div id='landing-page'>
      <div>
        <h1>A Personal Productivity App for gamers</h1>
        <p>Please note: the app is currently in early development. Please be patient with our appearance while the castle is assembled.</p>
        {/* <p>Experience your life as an adventure!</p> */}
        {/* TODO: Create a reuseable button component */}
        <button onClick={loginWithRedirect} style={temporaryButtonStyle}>Login/Sign-up</button>
      </div>
      <img src='https://i.ibb.co/VgHTkTg/bg-dark-torch.jpg' />
    </div>  
  )
}
