import React, { useContext, useState } from 'react';

import Modal from '@src/components/Modal';
import { QuestContext } from '@src/components/QuestsData';
import NewQuestButton from '@src/components/NewQuestButton';
import QuestEdit from './QuestEdit';

import QuestTree from '@src/components/DnDQuestTree';

import EditIcon from '@src/icons/highlighter.svg';
import CompleteIcon from '@src/icons/check-mark.svg';
import DeleteIcon from '@src/icons/trash-can.svg';

export default () => {
  const { questList, controller } = useContext(QuestContext);

  const [questToEdit, setQuestToEdit] = useState(null);

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h3>Quest Log</h3>
      <div className='paper'>
        {questList && <QuestTree data={questList} />}
        {/* {questList && <List sx={{flexGrow: 1}}>
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
                        setQuestToEdit(index)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      aria-label="delete quest" 
                      sx={{fontSize: '16px'}}
                      onClick={() => {
                        controller.deleteQuest(index)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
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
        </List>} */}
        {(questToEdit !== null) &&
          <Modal resetTrigger={() => {setQuestToEdit(null)}}>
            <QuestEdit questToEdit={questToEdit} />
          </Modal>
        }
        <div style={{alignSelf: 'center'}}>
          <NewQuestButton  createQuest={controller.createQuest} />
        </div>
      </div>
    </div> 
  )
}
