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
  Typography 
} from '@mui/material';

// import { UserContext } from '@src/App';
import { QuestContext } from '@src/components/QuestsData';
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
  // const { userProfile } = useContext(UserContext);
  const { questList, completeQuest } = useContext(QuestContext);
  const [ targetIndex, setTargetIndex ] = useState(0);
  const [ showOptionsMenu, setShowOptionsMenu ] = useState(null);
  const [ questsLoaded, setQuestsLoaded ] = useState(false);

  useEffect(() => {
    if (!questsLoaded && questList) {
      setQuestsLoaded(true);
    }    
  }, [questList]);

  function closeOptionsMenu() {
    setShowOptionsMenu(null);
  }

  function openOptionsMenu(event) {
    setShowOptionsMenu(event.currentTarget);
  }

  function handleOptionsSelection(event) {
    switch(event.target.innerText) {
      case 'Delete':
        console.log("Delete!");
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
      default:
        console.error("Input was detected in the options menu, but unable to indentify the option selected.");
    }
    closeOptionsMenu();
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
            <Button 
              variant="contained"
              size="medium"
              onClick={() => {
                completeQuest(targetIndex);
                if (targetIndex >= questList.length - 1) {
                  setTargetIndex(0)
                }
              }}
              disabled={!questsLoaded}
            >
              Complete
            </Button>
            <IconButton size="large" sx={styles.iconButton}>
              <AddIcon />
            </IconButton>
            <Button
              id="options-button"
              variant="outlined" 
              size="medium"
              aria-controls={!!showOptionsMenu ? 'options-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={!!showOptionsMenu ? 'true' : undefined}
              onClick={openOptionsMenu}
            >
              Options...
            </Button>
            <Menu 
              id="options-menu"
              anchorEl={showOptionsMenu}
              open={!!showOptionsMenu} 
              onClose={closeOptionsMenu}
              MenuListProps={{
                'aria-labelledby': 'options-button',
              }}
            >
              <Box sx={styles.optionsMenuBox}>
                <MenuItem onClick={handleOptionsSelection}>
                  Skip
                </MenuItem>
                <Divider />
                <MenuItem disabled onClick={handleOptionsSelection}>
                  Stash
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleOptionsSelection}>
                  Delete
                </MenuItem>
              </Box>
            </Menu>
          </Box>

        </Grid>
      </Paper>
    </Container>
  );
}
