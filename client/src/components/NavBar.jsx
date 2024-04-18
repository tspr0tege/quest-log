import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from '@mui/material';

import { NavBar as styles } from '@src/styles';

export default ({ navMenu = true }) => (
  <AppBar position="fixed" >
    <Container>
      <Toolbar variant="dense" sx={styles.toolbar}>
        {navMenu && <Box sx={styles.toolbarBox}>
          <Link to="/">
            <MenuItem sx={styles.menuItem}>
              <Typography variant="body2" color="text.primary">                
                Dashboard
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/quest-log">
            <MenuItem sx={styles.menuItem}>
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
  </AppBar>
)

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
