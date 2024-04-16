import React, { createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import QuestLog from './QuestLog/QuestLog';

const Context = createContext();

export default ({ userProfile }) => {
  const { logout } = useAuth0();
  
  function updateProfile() {}

  return (
    <Context.Provider 
      value={{ 
        user: userProfile.profile_id,
      }}
    >
      <div id="main-app">
        <a onClick={logout}>Logout</a>
        <QuestLog updateProfile={updateProfile} />
        <ProfileSidebar userProfile={userProfile}/>
      </div>
    </Context.Provider>
  )
}

export { Context };
