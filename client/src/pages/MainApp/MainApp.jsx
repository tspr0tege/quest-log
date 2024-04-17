import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Grid } from '@mui/material';

import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import Dashboard from './Dashboard/Dashboard';
// import QuestLog from './QuestLog/QuestLog';

export default () => {
  const { logout } = useAuth0();
  
  // function updateProfile() {}

  return (
    <Grid container sx={{height: '100%', pt: '48px'}}>
      {/* <Button onClick={logout} variant="contained" size="large">LOGOUT</Button> */}
      <ProfileSidebar />
      <Dashboard />
    </Grid>      
  )
}

