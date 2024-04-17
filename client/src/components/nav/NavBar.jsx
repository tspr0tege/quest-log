import React from 'react';
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

// import './Nav.css';

export default () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <AppBar position="fixed" >
      <Container>
        <Toolbar variant="dense">
          <Box
            sx={{display: 'flex', flexGrow: 1}}
          >
            <MenuItem
              // onClick={() => scrollToSection('pricing')}
              sx={{ py: '6px', px: '12px' }}
            >
              <Typography variant="body2" color="text.primary">                
                Dashboard
              </Typography>
            </MenuItem>
            <MenuItem
              // onClick={() => scrollToSection('pricing')}
              sx={{ py: '6px', px: '12px' }}
            >
              <Typography variant="body2" color="text.primary">
                Quest Log
              </Typography>
            </MenuItem>
          </Box>
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
