import React, { useEffect, useState, useContext } from 'react';

import { QuestContext } from '@src/components/QuestsData';
import OptionsButton from './OptionsButton';
import NewQuestButton from '@src/components/NewQuestButton';

import './Dashboard.css';

export default () => {
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
    <div className='container'>
      <h3>Dashboard</h3>
      <div className='paper'>
        <div className='paper-grid'>

          {/* Title */}
          {/* <Box>
            {questList?.length > 0 && 
              <Typography variant="h6" sx={{bgcolor: '#333', p: '15px'}}>
                {questList[targetIndex].title}
              </Typography>
            }
          </Box>

          {/* Description 
          <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h6">
              Details
            </Typography>
            {questList?.length > 0 && 
              <Typography sx={{flexGrow: 1, bgcolor: '#333', p: '15px'}}>
                {questList[targetIndex].notes}
              </Typography>
            }
          </Box>

          {/* Rewards - Tally, Streak, XP, AZ reward 
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
          </Box> */}

          {/* Controls - Complete, Add, Options(Delete, Skip, Stash) */}
          <div className='controls-box'>
            <button 
              onClick={() => {
                controller.completeQuest(targetIndex);
                if (targetIndex >= questList.length - 1) {
                  setTargetIndex(0)
                }
              }}
              disabled={!questsLoaded}
            >
              Complete
            </button>
            <NewQuestButton createQuest={controller.createQuest} />
            <OptionsButton handleOptionsSelection={handleOptionsSelection}/>
          </div>

        </div>
      </div>
    </div>
  );
}
