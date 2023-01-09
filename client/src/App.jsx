import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useState } from 'react';
import Modal from 'react-modal';

import QuestLog from './pages/questLog/QuestLog.jsx';
import Welcome from './pages/Welcome.jsx';

import './App.css';
import Nav from './components/nav/Nav.jsx';
import ProfileSidebar from './components/ProfileSidebar.jsx';

Modal.setAppElement('#app');
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'fit-content',
    maxHeight: '85vh',
    overflowY: 'auto',
    backgroundColor: 'var(--brown)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

const Context = createContext();

// const checkWindow = () => window.innerWidth < 750;
// const screenWidth = window.screen.width * window.devicePixelRatio;

const App = () => {
  
  /* useEffect(() => {
    const onResize = () => { if (checkWindow() !== smolScreen) {setSmolScreen(b => !b);} }
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize) }
  }, [smolScreen]); */

  return (
    <Auth0Provider
    domain="dev-6-2fm190.us.auth0.com"
    clientId="oyTxYOApnYlqIYSgDsOGbmdom0LvQ0Bo"
    redirectUri={window.location.origin}>
      <Startup />
    </Auth0Provider>
  )
}

const Startup = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [ smolScreen, setSmolScreen ] = useState(checkWindow());

  if (isLoading) return <p>Loading...</p>

  // Logged in
  return (
    <>
      {isAuthenticated ? <MainApp user={user} /> : <Welcome />}
    </>
  )
}

const MainApp = ({ user }) => (
  <Context.Provider 
    value={{ 
      user: user?.sub.split('|')[1], 
      modalStyle
    }}
  >        
    <Nav />
    <div id="main-app">
      <ProfileSidebar />
      <QuestLog />
    </div>
  </Context.Provider>
)

export default App;
export { Context };
