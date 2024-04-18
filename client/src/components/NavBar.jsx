import React from 'react';
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// import './Nav.css';

export default ({ navMenu = true }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <AppBar position="fixed" >
      <Container>
        <Toolbar variant="dense" sx={{justifyContent: 'flex-end'}}>
          {navMenu && <Box
            sx={{display: 'flex', flexGrow: 1}}
          >
            <Link to="/">
              <MenuItem
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="text.primary">                
                  Dashboard
                </Typography>
              </MenuItem>
            </Link>
            <Link to="/quest-log">
              <MenuItem
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant="body2" color="text.primary">
                  Quest Log
                </Typography>
              </MenuItem>
            </Link>
          </Box>}
          <Box>
            {(() => {
              return isAuthenticated 
                ?
                  <Button 
                    variant="contained" 
                    size="medium" 
                    onClick={() => logout({returnTo: window.location.origin})}
                  >
                    Log Out
                  </Button>
                : 
                  <Button 
                    variant="contained" 
                    size="medium" 
                    onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </Button>
            })()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
