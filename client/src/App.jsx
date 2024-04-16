import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LandingPage from './pages/LandingPage/LandingPage';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import MainApp from './pages/MainApp/MainApp';

import Profile from '@API/profile';

// import './App.css';

const defaultTheme = createTheme();

export default () => (
  <Auth0Provider
  domain="dev-6-2fm190.us.auth0.com"
  clientId="oyTxYOApnYlqIYSgDsOGbmdom0LvQ0Bo"
  redirectUri={window.location.origin}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <LandingNavigation />
    </ThemeProvider>
  </Auth0Provider>
)

const LandingNavigation = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ userProfile, setUserProfile ] = useState(null);
  const [ profileLoaded, setProfileLoaded ] = useState(false);
  
  useEffect(async () => {
    if (user !== undefined && userProfile === null) {
      const profileInfo = await Profile.get(user.sub.split('|')[1]);
      setUserProfile(profileInfo);
    }
  });

  useEffect(() => {
    if (userProfile !== null){
      setProfileLoaded(true);
    }
  }, [userProfile]);
  
  if (isLoading) return <p>Loading...</p> // Replace with Loading page

  // Not logged in
  if (!isAuthenticated) return <LandingPage />

  // Logged in, no profile
  if (profileLoaded && !userProfile) return <CreateProfile />

  // Logged in with profile
  return profileLoaded && <MainApp userProfile={userProfile} />

}
