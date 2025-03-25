import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div container sx={{ height: '100vh' }}>
      <div className='hero-bg'/>
      <div className='welcome-grid'>
        <div className="welcome-grid-box">
          <h2>Quest Log</h2>
          <h5>
            A Personal Productivity App for gamers
            {/* Experience your life as an adventure! */}
          </h5>
            {/* <Alert severity="warning" sx={{width: '80%'}}>
              Note: the app is currently in early development. Please be patient with our appearance while the castle is assembled.
            </Alert> */}
          <button onClick={loginWithRedirect} variant="contained" size="large">
            Login/Sign-up
          </button>
        </div>
      </div>
    </div>
  )
}
