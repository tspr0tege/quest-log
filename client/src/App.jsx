import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect, createContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom';

import QuestsData from '@src/components/QuestsData';
import ProfileSidebar from '@src/pages/MainApp/Dashboard/ProfileSidebar';
import { setNavigationService } from './NavigationTool.js';

import NavBar from '@src/components/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import Dashboard from './pages/MainApp/Dashboard/Dashboard';
import QuestLog from './pages/MainApp/QuestLog/QuestLog';

import Profile from '@API/profile';
import './App.css';

export const UserContext = createContext();


const NavigationService = () => {
  // console.log("Rendering NavigationService");
  const navObject = useNavigate();
  setNavigationService(navObject);

  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard"/>
  },
  {
    path: '/dashboard',
    element: <><NavigationService/><Dashboard /></>
  },
  {
    path: '/quest-log',
    element: <><NavigationService/><QuestLog /></>
  },
]);

export default () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ userProfile, setUserProfile ] = useState(null);
  const [ profileLoaded, setProfileLoaded ] = useState(false);
  
  useEffect(() => {
    async function getProfile() {
      const profileInfo = await Profile.get(user.sub.split('|')[1]);
      setUserProfile(profileInfo);
    }
    if (user !== undefined && userProfile === null) {
      getProfile()
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
      <NavBar />
      <main>
        <ProfileSidebar />
        <QuestsData>
          <RouterProvider router={router}/>
        </QuestsData>
      </main>
    </UserContext.Provider>
  )
}
