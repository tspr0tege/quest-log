import React, { useEffect, useState, useContext } from 'react';
import { createSvgIcon } from '@mui/material/utils';
import { 
  Box, 
  Button, 
  Container,
  Divider,
  Grid, 
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography 
} from '@mui/material';

// import { UserContext } from '@src/App';
import { QuestContext } from '@src/components/QuestsData';
import { Dashboard as styles } from '@src/styles';
import OptionsButton from './OptionsButton';
import NewQuestButton from './NewQuestButton';



export default () => {
  // const { userProfile } = useContext(UserContext);
  const { questList, controller } = useContext(QuestContext);
  const [ targetIndex, setTargetIndex ] = useState(0);
  const [ questsLoaded, setQuestsLoaded ] = useState(false);

  useEffect(() => {
    if (!questsLoaded && questList) {
      setQuestsLoaded(true);
    }    
  }, [questList]);

  function handleOptionsSelection(optionSelection) {
    switch(optionSelection) {
      case 'Delete':
        controller.deleteQuest(targetIndex);
        if (targetIndex >= questList.length -1) {
          setTargetIndex(0);
        }
        break;
      case 'Stash':
        console.log("Send task back to the vault.");
        break;
      case 'Skip':
        if (targetIndex + 1 >= questList.length) {
          setTargetIndex(0);
        } else {
          setTargetIndex(targetIndex + 1);
        }
        break;
      case 'Edit':
        break;
      default:
        console.error("Input was detected in the options menu, but unable to indentify the option selected.");
    }
  }
  
  return (
    <Container sx={styles.container}>
      <Typography component="h3" variant='h4'>
        Dashboard
      </Typography>
      <Paper sx={styles.paper}>
        <Grid sx={styles.paperGrid}>

          {/* Title */}
          <Box>
            {questList && 
              <Typography variant="h6" sx={{bgcolor: '#333', p: '15px'}}>
                {questList[targetIndex].title}
              </Typography>
            }
          </Box>

          {/* Description */}
          <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h6">
              Description
            </Typography>
            <Typography sx={{flexGrow: 1, bgcolor: '#333', p: '15px'}}>

            </Typography>
          </Box>

          {/* Rewards - Tally, Streak, XP, AZ reward */}
          <Box>
            <Typography variant="h6">
              Stats / Rewards
            </Typography>
            <Grid sx={styles.rewardsGrid}>
              <Box sx={styles.rewardsBox}>
                <Typography>              
                  Task ( {targetIndex + 1} / {questList?.length} )
                </Typography>
              </Box>
              <Box sx={styles.rewardsBox}>
                XP
              </Box>
              <Box sx={styles.rewardsBox}>
                Bonus XP
              </Box>
            </Grid>
          </Box>

          {/* Controls - Complete, Add, Options(Delete, Skip, Stash) */}
          <Box sx={styles.controlsBox}>
            <Button 
              variant="contained"
              size="large"
              onClick={() => {
                controller.completeQuest(targetIndex);
                if (targetIndex >= questList.length - 1) {
                  setTargetIndex(0)
                }
              }}
              disabled={!questsLoaded}
            >
              Complete
            </Button>
            <NewQuestButton createQuest={controller.createQuest} />
            <OptionsButton handleOptionsSelection={handleOptionsSelection}/>
          </Box>

        </Grid>
      </Paper>
    </Container>
  );
}
