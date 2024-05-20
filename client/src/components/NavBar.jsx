import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Box, Button, Container, Divider, Drawer, MenuItem, Toolbar, Typography } from '@mui/material';

import FullScreenIcon from '@src/icons/expand.svg';

import { NavBar as styles } from '@src/styles';

export default ({ navMenu = true }) => {
  const [ showMenu, setShowMenu ] = useState(false);
  
  return (
    <AppBar position="fixed" sx={{backgroundColor: {xs: 'transparent', sm: ''}}}>
      <Container sx={{display: {xs: 'none', sm: 'block'}}}>
        <Toolbar variant="dense" sx={styles.toolbar}>
          {navMenu && 
          <Box sx={styles.toolbarBox.standard}>
            <Link to="/">
              <MenuItem sx={styles.menuItem.standard}>
                <Typography variant="body2" color="text.primary">                
                  Dashboard
                </Typography>
              </MenuItem>
            </Link>
            <Link to="/quest-log">
              <MenuItem sx={styles.menuItem.standard}>
                <Typography variant="body2" color="text.primary">
                  Quest Log
                </Typography>
              </MenuItem>
            </Link>
          </Box>}
          <Box>
            <LogInOutButton />
          </Box>
        </Toolbar>
      </Container>
      <Button
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
      </Drawer>
    </AppBar>
  )
}
const LogInOutButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    
  if (isAuthenticated) {
    return (
      <Button 
        variant="contained" 
        size="medium" 
        onClick={() => logout({returnTo: window.location.origin})}
      >
        Log Out
      </Button>
    )
  } else {
    return (
      <Button 
      variant="contained" 
      size="medium" 
      onClick={() => loginWithRedirect()}
      >
        Log In
      </Button>
    );
  }
}
