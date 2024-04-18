import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { LandingPage as styles } from '@src/styles';
import { Alert, Box, Button, Grid, Typography } from '@mui/material';

export default () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid 
        item
        xs={false}
        sm={4}
        md={7}
        sx={styles.Herobg}
      />
      <Grid item xs={12} sm={8} md={5} sx={styles.WelcomeGrid}>
        <Box sx={styles.WelcomeGridBox}>
          <Typography component="h1" variant="h2">
            Quest Log
          </Typography>
          <Typography component="h2" variant="h5">
            A Personal Productivity App for gamers
            {/* Experience your life as an adventure! */}
          </Typography>
          <Alert severity="warning" sx={{width: '80%'}}>
            Note: the app is currently in early development. Please be patient with our appearance while the castle is assembled.
          </Alert>
          <Button onClick={loginWithRedirect} variant="contained" size="large">
            Login/Sign-up
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
