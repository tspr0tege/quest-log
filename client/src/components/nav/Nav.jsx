import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import './Nav.css';

export default () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div id="nav-bar">
      <ul>
        <NavBtn>
          Dashboard
        </NavBtn>
        <NavBtn>
          Quest Log
        </NavBtn>
      </ul>
      {isAuthenticated ? <LogoutBtn /> : <LoginBtn />}
    </div>
  )
}

const LoginBtn = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

const LogoutBtn = () => {
  const { logout } = useAuth0();
  const options = {returnTo: window.location.origin};

  return <button onClick={() => logout(options)}>Log Out</button>
}

const NavBtn = ({ children }) => {
  return (
    <a href="#" className="nav-btn">
      <li>
        {children}
      </li>
    </a>
  )
}
