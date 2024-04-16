import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { UserContext } from '@src/App';

import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import QuestLog from './QuestLog/QuestLog';

export default () => {
  const { logout } = useAuth0();
  const { userProfile } = useContext(UserContext);
  
  function updateProfile() {}

  return (
    <div id="main-app">
      <a onClick={logout}>Logout</a>
      {/* <QuestLog updateProfile={updateProfile} /> */}
      <ProfileSidebar userProfile={userProfile}/>
    </div>
  )
}

