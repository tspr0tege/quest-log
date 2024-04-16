import React, { useContext } from 'react';

import { UserContext } from '@src/App';

import './ProfileSidebar.css';

export default ({ userProfile }) => {
  // const 

  return (
    <div id="profile-sidebar">
      {!!userProfile &&
        <>
          <h3>Name</h3>
          <p>{userProfile.name}</p>
          <h3>Image</h3>
          <img src={userProfile.photo_url} alt="Profile Picture" />
          <h3>Level</h3>
          <p>{userProfile.level}</p>
          <h3>Next Level</h3>
          <p>{userProfile.exp} / {Math.floor(100 * Math.pow(1.1, userProfile.level - 1))}</p>
        </>
      }
    </div>
  );
}