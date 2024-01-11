import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard.jsx';

import './App.css';

// const checkWindow = () => window.innerWidth < 750;
// const screenWidth = window.screen.width * window.devicePixelRatio;

export default () => (
  <Auth0Provider
  domain="dev-6-2fm190.us.auth0.com"
  clientId="oyTxYOApnYlqIYSgDsOGbmdom0LvQ0Bo"
  redirectUri={window.location.origin}>
    <Router />
  </Auth0Provider>
)

const Router = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [ smolScreen, setSmolScreen ] = useState(checkWindow());
  /* useEffect(() => {
    const onResize = () => { if (checkWindow() !== smolScreen) {setSmolScreen(b => !b);} }
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize) }
  }, [smolScreen]); */
  
  if (isLoading) return <p>Loading...</p>

  // Logged in
  return (
    <>
      {isAuthenticated ? <Dashboard user={user} /> : <LandingPage />}
    </>
  )
}
