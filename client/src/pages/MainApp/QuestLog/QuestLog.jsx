import React, { useContext, useState } from 'react';
import { Box, Container, Divider, IconButton, List, ListItemButton, Paper, Typography } from '@mui/material';

import Modal from '@src/components/Modal';
import { QuestContext } from '@src/components/QuestsData';
import NewQuestButton from '@src/components/NewQuestButton';
import QuestEdit from './QuestEdit';
// import { Dashboard as styles } from '@src/styles';
import EditIcon from '@src/icons/highlighter.svg';
import CompleteIcon from '@src/icons/check-mark.svg';

export default () => {
  const { questList, controller } = useContext(QuestContext);

  const [targetIndex, setTargetIndex] = useState(null);

  return (
    <Container sx={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography component="h3" variant='h4'>
        Quest Log
      </Typography>
      <Paper sx={{bgcolor: '#191919', width: '50%', padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
        {questList && <List sx={{flexGrow: 1}}>
          {questList.map((quest, index) => {
            return (
              <>
                <ListItemButton key={index} sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography noWrap>
                    {quest.title}
                  </Typography>
                  <Box sx={{display: 'flex'}}>
                    <IconButton 
                      aria-label="edit quest details" 
                      sx={{fontSize: '16px'}}
                      onClick={() => {
                        setTargetIndex(index)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* TODO: ADD DELETE BUTTON */}
                    <IconButton 
                      aria-label="complete quest" 
                      sx={{fontSize: '16px'}} 
                      onClick={() => {
                        controller.completeQuest(index);
                      }}
                    >
                      <CompleteIcon />
                    </IconButton>
                  </Box>
                </ListItemButton>
                {(index + 1 < questList.length) && <Divider />}
              </>
            )
          })}
        </List>}
        {(targetIndex !== null) &&
          <Modal resetTrigger={() => {setTargetIndex(null)}}>
            <QuestEdit targetIndex={targetIndex} />
          </Modal>
        }
        <Box sx={{alignSelf: 'center'}}>
          <NewQuestButton  createQuest={controller.createQuest} />
        </Box>
      </Paper>
    </Container> 
  )
}
