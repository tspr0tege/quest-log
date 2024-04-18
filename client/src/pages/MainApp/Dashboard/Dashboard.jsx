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
        <Grid sx={styles.grid}>

          {/* Title */}
          <Box>
            <Typography>              
              Task ( {targetIndex + 1} / {questList?.length} )
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
            <Button 
              variant="contained"
              size="medium"
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
