import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';

import NavBar from '../../components/NavBar';
import QuestsData from '@src/components/QuestsData';
import ProfileSidebar from './Dashboard/ProfileSidebar';

export default () => (
  <>
    <NavBar />
    <Grid container sx={{height: '100%', pt: '48px'}}>
      <ProfileSidebar />
      <QuestsData>
        <Outlet />          
      </QuestsData>
    </Grid>
  </>
)
