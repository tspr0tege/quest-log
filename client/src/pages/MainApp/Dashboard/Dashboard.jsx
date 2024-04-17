import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';

import Quest from '@API/quests'
import { UserContext } from '@src/App';
import { Dashboard as styles } from '@src/styles';

const AddIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Add'
);

export default () => {
  const { userProfile } = useContext(UserContext);
  const [ questList, setQuestList ] = useState(null);
  const [ targetIndex, setTargetIndex ] = useState(0)

  useEffect(async () => {
    if (questList === null) {
      const newList = [], getList = await Quest.get(null, userProfile.profile_id);
      for (let obj in getList) {
        newList.push(getList[obj]);
      }
      setQuestList(newList);
    }
  });
  
  return (
    <Container sx={styles.container}>
      <Typography component="h3" variant='h4'>
        Dashboard
      </Typography>
      <Paper sx={styles.paper}>
        <Grid sx={styles.grid}>

          {/* Title */}
          <Box>
            <Typography variant="h6">              
              Title
            </Typography>
              {questList && 
                <Typography variant="h6">
                  {questList[targetIndex].title}
                </Typography>
              }
          </Box>

          {/* Description */}
          <Box>
            <Typography variant="h6">
              Description
            </Typography>
            <Typography></Typography>
          </Box>

          {/* Rewards - Tally, Streak, XP, AZ reward */}
          <Box>
            <Typography variant="h6">
              Rewards
            </Typography>
          </Box>

          {/* Controls - Complete, Add, Options(Delete, Skip, Stash) */}
          <Box sx={styles.controlsBox}>
            <Button variant="contained" size="medium">Complete</Button>
            <IconButton size="large" sx={styles.iconButton}>
              <AddIcon />
            </IconButton>
            <Button variant="outlined" size="medium">Options...</Button>
            {/* TODO: Use MUI Drawer for Options menu */}
          </Box>
        </Grid>
      </Paper>
    </Container>
  );
}
