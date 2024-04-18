import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';

import NavBar from '../../components/NavBar';
import QuestsData from '@src/components/QuestsData';
import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import Dashboard from './Dashboard/Dashboard';
import QuestLog from './QuestLog/QuestLog';

export default () => {

  return (
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
}

