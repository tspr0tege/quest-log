import React, { useContext } from 'react';

import { UserContext } from '@src/App';

import './ProfileSidebar.css'

export default () => {
  const { userProfile } = useContext(UserContext);

  return (
    // style={{display: {xs: 'none', md: 'block'}, bgcolor: 'primary.main', p: '20px', pb: 0}}>
    <div id="profile-sidebar">
      {!!userProfile &&
        <>
          <h3>Name:</h3>
          <p>{userProfile.name}</p>
          <h3>Profile Photo:</h3>
          <img 
            style={{
              height: '160px',
              width: '160px',
              objectFit: 'cover'
            }}
            src={userProfile.photo_url} alt="Profile Picture" 
          />
          <h3>Level:</h3>
          <p>{userProfile.level}</p>
          <h3>Next Level</h3>
          <p>
            {userProfile.exp} / {Math.floor(100 * Math.pow(1.1, userProfile.level - 1))}
          </p>
        </>
      }
    </div>
  );
}