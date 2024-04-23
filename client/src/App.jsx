import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavBar from '@src/components/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import MainApp from './pages/MainApp/MainApp';
import Dashboard from './pages/MainApp/Dashboard/Dashboard';
import QuestLog from './pages/MainApp/QuestLog/QuestLog';
import { muiTheme } from '@src/styles'

import Profile from '@API/profile';

export const UserContext = createContext();
const defaultTheme = createTheme(muiTheme);

export default () => (
  <Auth0Provider
    domain="dev-6-2fm190.us.auth0.com"
    clientId="oyTxYOApnYlqIYSgDsOGbmdom0LvQ0Bo"
    redirectUri={window.location.origin}
  >
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Navigator />
    </ThemeProvider>
  </Auth0Provider>
)

const Navigator = () => {
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
    if (userProfile !== null && profileLoaded === false){
      setProfileLoaded(true);
    }
  }, [userProfile]);

  function updateProfile(update) {
    // TODO: check for update to level and execute animation
    setUserProfile({...userProfile, ...update});
  }
  
  if (isLoading) return <p>Loading...</p> // Replace with Loading page component

  // Not logged in
  if (!isAuthenticated) return <LandingPage />

  // Logged in, no profile
  if (profileLoaded && !userProfile) return (
    <UserContext.Provider value={{
      auth0UserID: user?.sub.split('|')[1] || ''
    }}>
      <NavBar navMenu={false} />
      <CreateProfile />
    </UserContext.Provider>
  )

  // Logged in with profile
  return (
    profileLoaded && <UserContext.Provider 
      value={{ 
        userProfile,
        updateProfile
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />}>
            <Route index element={<QuestLog />} /> {/*Dashboard*/}
            <Route path="/quest-log" element={<QuestLog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

// export { UserContext };
