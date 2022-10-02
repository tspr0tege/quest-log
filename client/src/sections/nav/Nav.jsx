import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import LoginBtn from '@src/components/LoginBtn';
import LogoutBtn from '@src/components/LogoutBtn';

import './Nav.css';

export default () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div id="nav-bar">
      <button>Dashboard</button>
      <button className="current">Quest Log</button>
      <button disabled>Roadmapping</button>
      <button disabled>Lists/Habits</button>
      <button disabled>Profile</button>
      {isAuthenticated ? <LogoutBtn /> : <LoginBtn />}
    </div>
  )
}
