import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Alert, Box, Button, Grid, Paper, Typography } from '@mui/material';

// import './LandingPage.css';

export default () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid 
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://i.ibb.co/VgHTkTg/bg-dark-torch.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50%',
            transform: 'translateY(-50%)',
            gap: '2em'
          }}
        >
          <Typography component="h1" variant="h5">
            A Personal Productivity App for gamers
          </Typography>
          <Alert severity="warning" sx={{width: '80%'}}>
            Note: the app is currently in early development. Please be patient with our appearance while the castle is assembled.
          </Alert>
          {/* <p>Experience your life as an adventure!</p> */}
          <Button onClick={loginWithRedirect} variant="contained" size="large">
            Login/Sign-up
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
