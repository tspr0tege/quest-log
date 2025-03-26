import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { navigateTo } from '@src/NavigationTool';

import FullScreenIcon from '@src/icons/expand.svg';

import './NavBar.css';

export default ({ navMenu = true }) => {
  // const [ showMenu, setShowMenu ] = useState(false);
  
  return (
    <nav>
      {/* <div className="container"> */}
      {navMenu && 
      <div className="app-navigation">
        <button onClick={() => {navigateTo('/')}}>
          Dashboard
        </button>
        <hr/>
        <button onClick={() => {navigateTo('/quest-log')}}>
          Quest Log
        </button>
      </div>}
      <LogInOutButton />
      {/* </div > */}
      {/* <Button
        variant="outlined"
        fullWidth={false}
        sx={{
          display: {xs: 'block', sm: 'none'},
          position: 'fixed',
          right: 0
        }}
        onClick={() => setShowMenu(!showMenu)}
      >
        |||
      </Button>
      <Drawer anchor="right" open={showMenu} onClose={() => setShowMenu(false)}>
        {navMenu &&
        <Box sx={styles.toolbarBox.mobile}>
          <Link to="/">
            <MenuItem sx={styles.menuItem.mobile}>
              <Typography variant="body2" color="text.primary">                
                Dashboard
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/quest-log">
            <MenuItem sx={styles.menuItem.mobile}>
              <Typography variant="body2" color="text.primary">
                Quest Log
              </Typography>
            </MenuItem>
          </Link>
        </Box>}
        <Divider/>
        <Button 
          startIcon={<FullScreenIcon/>}
          sx={{color: '#fff', margin: '10px'}}
          onClick={() => {
            document.body.requestFullscreen();
          }}
        >
          Fullscreen
        </Button>
        <Divider/>
        <Box sx={{alignSelf: 'center', padding: '20px'}}>
          <LogInOutButton />
        </Box>
      </Drawer> */}
    </nav>
  )
}
const LogInOutButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    
  if (isAuthenticated) {
    return (
      <button id="login-logout-button"
        onClick={() => logout({returnTo: window.location.origin})}
      >
        Log Out
      </button>
    )
  } else {
    return (
      <button id="login-logout-button"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    );
  }
}
