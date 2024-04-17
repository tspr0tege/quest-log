import React from 'react';
import { Grid } from '@mui/material';

import QuestsData from '@src/components/QuestsData';
import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import Dashboard from './Dashboard/Dashboard';

export default () => {

  return (
    <Grid container sx={{height: '100%', pt: '48px'}}>
      <ProfileSidebar />
      <QuestsData>
        <Dashboard />
      </QuestsData>
    </Grid>      
  )
}

